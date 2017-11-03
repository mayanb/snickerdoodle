import React from 'react'
import {connect} from 'react-redux'
import * as actions from './InventoryActions'
import * as detailActions from '../InventoryDetail/InventoryDetailActions'
import InventoryListHeader from './InventoryListHeader'
import InventoryListItem from './InventoryListItem'

class InventoryList extends React.Component {
  render() {
    let {ui, data} = this.props.inventory
    return (
      <div className={"inventory-list"}>
        <InventoryListHeader />
        {
          data.map(function (process, i) {
            return  <InventoryListItem key={i} {...process} selected={i == ui.selectedItem} onClick={() => this.handleSelectInventory(i)}/>
          }, this)
        }
      </div>
    )
  }

  handleSelectInventory(index) {
    if (!this.props.inventory.data[index])
      return 

    let filters = {process: this.props.inventory.data[index].process_id}
    this.props.dispatch(actions.selectInventory(index))
    this.props.dispatch(detailActions.fetchInventory(filters))
  }
}

const mapStateToProps = (state/*, props*/) => {
  return {
    inventory: state.inventories,
  }
}
export default connect(mapStateToProps)(InventoryList)

