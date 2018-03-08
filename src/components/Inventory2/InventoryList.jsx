import React from 'react'
import { connect } from 'react-redux'
import PaginatedTable from '../PaginatedTable/PaginatedTable'
import * as actions from './InventoryActions'
import InventoryListRow from './InventoryListRow'

class InventoryList extends React.Component {
	constructor(props) {
		super(props)
		this.handlePagination = this.handlePagination.bind(this)
		this.handleSelectRow = this.handleSelectRow.bind(this)
	}

	componentDidMount() {
		this.props.dispatch(actions.fetchInitialInventory())
	}

	render() {
		return (
			<PaginatedTable
				{...this.props}
				onClick={this.handleSelectRow}
				onPagination={this.handlePagination}
				Row={InventoryListRow}
				TitleRow={"div"}
			/>
		)
	}

	handleSelectRow(i) {
		this.props.dispatch(actions.selectInventory(i))
		console.log(this.props.ui.selectedItem)
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
		//data: mock_data,
		//ui: { page_size: mock_data.length, currentPage: 0 }
		data: state.inventory2.data,
		ui: state.inventory2.ui,
	}
}

export default connect(mapStateToProps)(InventoryList)