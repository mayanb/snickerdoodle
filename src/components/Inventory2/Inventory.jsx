import React from 'react'
import { connect } from 'react-redux'
import ApplicationSectionHeader from '../Application/ApplicationSectionHeader'
import * as actions from './InventoryActions'
import InventoryDrawer from './InventoryDrawer'
import PaginatedTable from '../PaginatedTable/PaginatedTable'
import InventoryFilters from './InventoryFilters'
import InventoryListRow from './InventoryListRow'
import ObjectList from '../ObjectList/ObjectList'
import Loading from '../Loading/Loading'
import './styles/inventory.css'

export class Inventory extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			processTypes: [],
			productTypes: []
		}

		this.handleSelectRow = this.handleSelectRow.bind(this)
		this.handlePagination = this.handlePagination.bind(this)
		this.handleFilter = this.handleFilter.bind(this)
		this.fetchInventory = this.fetchInventory.bind(this)
	}

	componentDidMount() {
		this.fetchInventory()
	}

	fetchInventory() {
		this.props.dispatch(actions.fetchInitialInventory(this.state.processTypes, this.state.productTypes))
		this.props.dispatch(actions.resetPageInventory())
	}



	render() {
		let { ui } = this.props
		return (
			<div className="inventory2-container">
				<ApplicationSectionHeader>Inventory</ApplicationSectionHeader>

				<div className="inventory2-content">
					<div className="inventory-list-container">
						<InventoryFilters
							onFilter={this.handleFilter}
						/>
						<Loading isFetchingData={ui.isFetchingData}>
							<ObjectList>
								<PaginatedTable
									ui={this.props.ui}
									data={this.props.data}
									onClick={this.handleSelectRow}
									onPagination={this.handlePagination}
									Row={InventoryListRow}
								/>
							</ObjectList>
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

	handleFilter(processTypes, productTypes) {
		this.setState({
			processTypes: processTypes,
			productTypes: productTypes
		}, this.fetchInventory)
	}
}

const mapStateToProps = (state/*, props*/) => {
	return {
		data: state.inventory2.data,
		ui: state.inventory2.ui,
	}
}

export default connect(mapStateToProps)(Inventory)
