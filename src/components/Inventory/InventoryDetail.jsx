import React from 'react'
import {connect} from 'react-redux'
import InventoryDetailHeader from './InventoryDetailHeader'
import InventoryDetailList from './InventoryDetailList'

class InventoryDetail extends React.Component {

	render() {
		let props = this.props
		return (
			<div className={"inventory-detail "}>
				<InventoryDetailHeader {...this.props.process} />
				<InventoryDetailList inventoryDetails={props.inventoryDetails.data} />
			</div>
		)
	}
}

const mapStateToProps = (state/*, props*/) => {
  return {
    inventoryDetails: state.inventoryDetails,
    inventory: state.inventory
  }
}

export default connect(mapStateToProps)(InventoryDetail)
