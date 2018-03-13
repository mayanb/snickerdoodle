import React from 'react'
import { connect } from 'react-redux'
import ApplicationSectionHeader from '../Application/ApplicationSectionHeader'
import * as actions from './InventoryActions'
import InventoryDrawer from './InventoryDrawer'
import PaginatedTable from '../PaginatedTable/PaginatedTable'
import InventoryListRow from './InventoryListRow'
import Loading from '../Loading/Loading'
import './styles/inventory.css'
import './styles/inventorylist.css'

export class Inventory extends React.Component {
	constructor(props) {
		super(props)

		this.handleSelectRow = this.handleSelectRow.bind(this)
		this.handlePagination = this.handlePagination.bind(this)
	}

	componentDidMount() {
		this.props.dispatch(actions.fetchInitialInventory())
	}

	render() {
		let { ui } = this.props
		return (
			<div className="inventory2-container">
				<ApplicationSectionHeader>Inventory</ApplicationSectionHeader>

				<div className="inventory2-content">
					<div className="inventory-list-container">
						<Loading isFetchingData={ui.isFetchingData}>
							<PaginatedTable
								ui={this.props.ui}
								data={this.props.data}
								onClick={this.handleSelectRow}
								onPagination={this.handlePagination}
								Row={InventoryListRow}
							/>
						</Loading>
					</div>
					<InventoryDrawer />
				</div>

			</div>
		)
	}

	handleSelectRow(i) {
		this.props.dispatch(actions.selectInventory(i))
	}

	handlePagination(direction) {
		let { ui, dispatch } = this.props
		if (direction === 1 && ui.more) {
			dispatch(actions.fetchMoreInventory(ui.more))
		}
		dispatch(actions.pageInventory(direction))
	}
}

const mapStateToProps = (state/*, props*/) => {
	return {
		data: state.inventory2.data,
		ui: state.inventory2.ui,
	}
}

export default connect(mapStateToProps)(Inventory)
