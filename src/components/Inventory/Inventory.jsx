import React from 'react'
import {connect} from 'react-redux'
import {InventoryDetail} from '../OldComponents/InventoryDetail.jsx'
import InventoryList from './InventoryList'
import { InventoryFilter, Filters } from '../OldComponents/Inputs.jsx'
import {fetch, requestID, ZeroState} from '../OldComponents/APIManager.jsx'
import Loading from '../OldComponents/Loading.jsx'
import update from 'immutability-helper'
import * as actions from './InventoryActions'

class Inventory extends React.Component {
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

  componentDidMount() {
    this.props.dispatch(actions.fetchInventory())
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

  handleDelivery(selectedCount) {
    var processIndex = 0
    for (let [index, process] of this.state.processes.entries()) {
      if (process.process_id == this.props.match.params.id) {
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
            productFilter={this.state.productFilter}
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
    let {data, ui} = props.inventory
    
    if (ui.isFetchingData) {
      return <Loading />
    } else if (!data || data.length == 0) {
      return <ZeroState filtered={props.productFilter && props.productFilter.length} />
    }

    let detail = (ui.selectedItem != null && data[ui.selectedItem] != null) ? (
        <InventoryDetail 
          process={data[ui.selectedItem]}
          filter={props.productFilter.length>0?props.productFilterStr:null} 
          match={props.match} 
          showDetail={props.match.params.id}
          onDelivery={props.onDelivery}
        />
        ) : null

    return (
      <div className="halves">
        <InventoryList  inventory={data} />
        { detail }
      </div>
    )
  }

}

function InventoryHeader(props) {
  let a = <InventoryFilter options={props.options} onFilter={props.onFilder} selected={props.selected} />
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

const mapStateToProps = (state/*, props*/) => {
  return {
    inventory: state.inventories,
  }
}
export default connect(mapStateToProps)(Inventory)