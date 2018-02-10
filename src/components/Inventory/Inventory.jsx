import React from 'react'
import {Link} from 'react-router-dom'
import {InventoryDetail} from '../OldComponents/InventoryDetail.jsx'
import {requestID, ZeroState} from '../OldComponents/APIManager.jsx'
import Loading from '../OldComponents/Loading.jsx'
import update from 'immutability-helper'
import api from '../WaffleconeAPI/api'
import Img from '../Img/Img'
import Checkbox from '../Checkbox/Checkbox'
import moment from 'moment'
import './styles/inventory.css'

export default class Inventory extends React.Component {
  constructor(props) {
    super(props)
    this.handleProductFilter = this.handleProductFilter.bind(this)
    this.latestRequestID = -1
    this.state = {
      processes: [],
      products: [],
      loading: false,
      selected: -1,
      productFilter: [],
      productFilterStr: "",
    }
  }

  getProcessesForInventory() {
    this.setState({loading: true})

    var params = {}
    if (this.state.productFilter.length > 0)
      params={products:this.state.productFilterStr}

    let component = this
    let rid = requestID()
    this.latestRequestID = rid

    api.get("/ics/inventory/")
      .query(params)
      .end(function (err, data) {
        if (component.latestRequestID === rid)
          component.setState({processes : data.body, loading: false})
      })
  }

  getProductsForInventory() {
    let component = this

    api.get('/ics/products/codes/')
      .end(function (err, data) {
        /**
        let mappedProducts = data.body.map(function (product, i) {
          return {value: product.id, label: product.name}
        })
         */
        component.setState({products: data.body})
      })
  
  }

  componentDidMount() {
    this.getProcessesForInventory()
    this.getProductsForInventory()
  }

  handleProductFilter(which, val) {
    let component = this
    let valStr = val.map(function (v, i) {
      return v.code
    }).join()
    this.setState({[which] : val, productFilterStr : valStr}, function () {
      component.getProcessesForInventory()
    })
  }

  getSelectedProcess() {
    let a = this.state.processes.find(function (x) {
      return (x.process_id === this.props.match.params.id)
    }, this)
    return a
  }

  handleDelivery(selectedCount) {
    var processIndex = 0
    for (let [index, process] of this.state.processes.entries()) {
      if (process.process_id === this.props.match.params.id) {
        processIndex = index
        break
      }
    }

    let newProcesses = update(this.state.processes, {
      [processIndex]: {
        count: {
          $apply: function (c) { return c - selectedCount }
        }
      }
    })

    this.setState({processes: newProcesses})

  }

  render() {
    let props = this.props



    return (
      <div className="inventory">
        <div className={"page " + (props.match.params.id?"smallDetail":"")}>
          <InventoryHeader options={this.state.products} onFilter={this.handleProductFilter} selected={this.state.productFilter}/>
          <Rule />

          <Content 
            {...props} 
            {...this.state} 
            selectedProcess={this.getSelectedProcess()}
            onDelivery={this.handleDelivery.bind(this)} 
          />
          
        </div>
      </div>
    )
  }
}

class Content extends React.Component {

  render() {
    let props = this.props
    var contentArea = <InventoryList  processes={props.processes} selected={props.match.params.id} />
    if (props.loading) {
      contentArea = <Loading />
    } else if (!props.processes || props.processes.length === 0) {
      contentArea = <ZeroState filtered={props.productFilter && props.productFilter.length} />
    }

    return (
      <div className="halves">
        {contentArea}
        <InventoryDetail 
          {...props.selectedProcess} 
          filter={props.productFilter.length>0?props.productFilterStr:null} 
          match={props.match} 
          showDetail={props.match.params.id}
          onDelivery={props.onDelivery}
        />
      </div>
    )
  }
}

function InventoryHeader(props) {
  //let a = <InventoryFilter options={props.options} onFilter={props.onFilder} selected={props.selected} />
  return (
      <div className="inventory-header">
         <h2>Inventory</h2>
      </div>
  )
}

function Rule(props) {
  return (
    <div className="rule" />
  )
}

class IH extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      fixed: false,
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll.bind(this))
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll(e) { 
    if (this && this.state) {
      if (e.srcElement.scrollingElement.scrollTop > 176) {
        this.setState({fixed: true})
      } else {
        this.setState({fixed: false})
      }
    }
  }


  render() {
    return (
      <div className={this.state.fixed?"fixed":""}>
        <InventoryItem i={"no"} header={true} output_desc={"PRODUCT TYPE"} count={"COUNT"} unit={"UNIT"} />
      </div>
    )
  }
}

function InventoryList(props) {
  return (
    <div className={"inventory-list " + (props.fixed?"list-padded":"")}>
      <IH />
      {
        props.processes.map(function (process, i) {
          return  (
            <Link key={i} to={ "/inventory/" + process.process_id}>
              <InventoryItem i={i} selected={props.selected} {...process}/>
            </Link>
          )
        }, this)
      }
    </div>
  )
}


function InventoryItem(props) {
  var teamStyle = {color: "rgba(0,0,0,0.3", paddingLeft: "4px", fontSize: "10px"}
  let currTeam = window.localStorage.getItem("team") || "1"
  teamStyle["display"] = currTeam===props.team_id?"none":""
  let icon = props.process_icon || "default.png" 
  return (
    <div className={"inventoryClass " + isSelected(props) + " " + isHeader(props)} onClick={props.onClick}>
      <div className="i-check">
        <Checkbox size="16px" checked={isSelected(props)} />
      </div>
      <div className="i-icon">
        <Img className="inventory-icon" src={icon.substring(0, icon.length - 4) + "@3x"} onError={addDefaultSrc}/>
      </div>
      <div className="i-code">
        <span>{props.process_code || "CODE"}</span>
      </div>
      <div className="i-outputdesc">
        <span>{props.output_desc.sentenceCase()}</span>
        <span style={teamStyle}>{props.team}</span>
      </div>
      <div className="i-count">
        <span>{count(props.count)}</span>
      </div>
      <div className="i-unit">
        <span>{props.unit.sentenceCase() + "s"}</span>
      </div>
      <div className="i-date">
        <span>{props.oldest?moment(props.oldest).format('MMM YYYY'):"OLDEST"}</span>
      </div>
    </div>
  )
}

function count(c) {
  let p = parseInt(c, 10)
  if (p - c !== 0)
    return c
  return p
}

function isHeader(props) {
  return (props.header === true) ? "inventoryClass-header" : ""
}

function isSelected(props) {
  if (isHeader(props))
    return false
  return (props.process_id === props.selected) ? "selected" : ""
}

//eslint-disable-next-line
String.prototype.sentenceCase = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

function addDefaultSrc(ev) {
  ev.target.src = '/img/default@3x.png'
}
