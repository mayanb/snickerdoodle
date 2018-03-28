import React from 'react'
import { connect } from 'react-redux'
import * as actions from './InventoryActions'
import {Link} from 'react-router-dom'
import {InventoryDetail} from './InventoryDetail.jsx'
import {ZeroState} from '../OldComponents/APIManager.jsx'
import Loading from '../OldComponents/Loading.jsx'
import Img from '../Img/Img'
import Checkbox from '../Checkbox/Checkbox'
import moment from 'moment'
import './styles/inventory.css'

class Inventory extends React.Component {
  constructor(props) {
    super(props)
    this.latestRequestID = -1
    this.state = {
      selected: -1,
    }
  }

  componentDidMount() {
    this.props.dispatch(actions.fetchInventory())
  }

  getSelectedProcess() {
    let a = Object.values(this.props.data).find(function (x) {
      return (x.process_id === this.props.match.params.id)
    }, this)
    return a
  }

  render() {
    let props = this.props

    return (
      <div className="inventory">
        <div className={"page " + (props.match.params.id?"smallDetail":"")}>
          <InventoryHeader />
          <Rule />

          <Content 
            {...props}
            loading={this.props.ui.isFetchingData}
	          inventories={Object.values(this.props.data)}
            selectedProcess={this.getSelectedProcess()}
          />
          
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    data: state.inventories.data,
    ui: state.inventories.ui
  }
}

export default connect(mapStateToProps)(Inventory)

class Content extends React.Component {

  render() {
    let props = this.props
    var contentArea = <InventoryList
      inventories={props.inventories}
      selected={props.match.params.id}
    />
    if (props.loading) {
      contentArea = <Loading />
    } else if (!props.inventories || props.inventories.length === 0) {
      contentArea = <ZeroState />
    }

    return (
      <div className="halves">
        {contentArea}
        <InventoryDetail 
          processId={props.match.params.id}
          showDetail={props.match.params.id}
          loading={props.ui.isFetchingData || props.ui.isFetchingItemsData}
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

function InventoryList(props) {
  return (
    <div className={"inventory-list " + (props.fixed?"list-padded":"")}>
	    <InventoryItem i={"no"} header={true} output_desc={"PRODUCT TYPE"} count={"COUNT"} unit={"UNIT"} />
      {
        props.inventories.map(function (process, i) {
          return  (
            <Link key={i} to={ "/old-inventory/" + process.process_id}>
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
  let currTeam = window.localStorage.getItem("team")
  teamStyle["display"] = currTeam===props.team_id?"none":""
  let icon = props.process_icon || "default.png" 
  return (
    <div className={"inventoryClass " + isSelected(props) + " " + isHeader(props)}>
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
