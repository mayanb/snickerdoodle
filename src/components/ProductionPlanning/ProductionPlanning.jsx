import React from 'react'
import { connect } from 'react-redux'
import ApplicationSectionHeader from '../Application/ApplicationSectionHeader'
import ObjectListHeader from '../ObjectList/ObjectListHeader'
import ObjectList from '../ObjectList/ObjectList'
import WorkInProgressListRow from './WorkInProgressListRow'
import { ProductionAside } from './ProductionAside'
import ProductionPlanningFilters from './ProductionPlanningFilters'
import { RawMaterialTimeline } from './RawMaterialTimeline'
import Table from '../Table/Table'
import * as actions from './ProductionPlanningActions'
import './styles/productionplanning.css'

export class ProductionPlanning extends React.Component {
	constructor(props) {
		super(props)
		this.state = { 
			selectedProcess: null, 
			selectedProduct: null,
			ordering: 'creating_task__process_type__name'
		}

		this.renderTableHeader = this.renderTableHeader.bind(this)
		this.handleSelectRow = this.handleSelectRow.bind(this)
		this.handleReorder = this.handleReorder.bind(this)
		this.handleFilter = this.handleFilter.bind(this)
		this.fetchAncestorsInventories = this.fetchAncestorsInventories.bind(this)
	}

	componentDidMount() {
		this.setDefaultFilters()
	}

	render() {
		const { ui, rawMaterials, workInProgress } = this.props
		const { selectedProcess, selectedProduct } = this.state
		return (
			<div className='production-planning-container'>
				<ApplicationSectionHeader>Production Planning</ApplicationSectionHeader>
				<div className='production-planning-body'>
					<div className='production-planning-content'>
						<ProductionPlanningFilters 
							onFilter={this.handleFilter}
							selectedProcess={selectedProcess}
							selectedProduct={selectedProduct} 
						/>
						<RawMaterialTimeline data={rawMaterials}/>
						<ObjectList isFetchingData={ui.isFetchingData} className='work-in-progress-list-container'>
							<Table
								ui={ui}
								data={workInProgress}
								TitleRow={this.renderTableHeader}
								onClick={this.handleSelectRow}
								Row={WorkInProgressListRow}
							/>
						</ObjectList>
					</div>
					<ProductionAside />
				</div>
			</div>
		)
	}

	renderTableHeader() {
		const columns = [
			{ title: 'Product', className: 'inv-product', field: null },
			{ title: 'In Stock', className: 'inv-in-stock', field: null },
			{ title: 'Can Make', className: 'inv-can-make', field: null },
		]
		return (
			<ObjectListHeader columns={columns} onReorder={this.handleReorder} ordering={this.state.ordering} />
		)
	}

	handleSelectRow() {
		console.log('ROW CLICKED')
	}

	handleReorder(ordering) {
		this.setState({ ordering }, this.fetchAncestorsInventories)
	}

	handleFilter(selectedProcess, selectedProduct) {
		//console.log("handleFilter(" +selectedProcess+ "," +selectedProduct+ ")")
		this.setState({selectedProcess, selectedProduct}, this.fetchAncestorsInventories)
		const qs = new URLSearchParams(this.props.location.search)
		qs.set('selectedProcess', selectedProcess ? selectedProcess : '')
		qs.set('selectedProduct', selectedProduct ? selectedProduct : '')
		this.props.history.push({ search: qs.toString() })
	}

	fetchAncestorsInventories() {
		const { selectedProcess, selectedProduct, ordering } = this.state
		if (selectedProcess && selectedProduct) {
			console.log("FETCHING ANCESTORS...")
			this.props.dispatch(actions.fetchRemainingInventory(selectedProcess, selectedProduct, 'rm', ordering))
			this.props.dispatch(actions.fetchAncestorsInventory(selectedProcess, selectedProduct, 'wip', ordering))
		}
	}

	setDefaultFilters() {
		const qs = new URLSearchParams(this.props.location.search)
		const selectedProcess = qs.get('selectedProcess') ? qs.get('selectedProcess') : ''
		const selectedProduct = selectedProcess && qs.get('selectedProduct') ? qs.get('selectedProduct') : ''
		this.handleFilter(selectedProcess, selectedProduct)
	}
}

function RawMaterialChart({data, process, product}) {
	return (
		<div>
			<h1>Raw Material Chart</h1>
			{ process && product && data && data.map((rm, i) => {
				return (
					<div key={i}>
						{`${rm.process_type.code}-${rm.product_type.code}      ${rm.date_exhausted}`}
					</div>
				)
			}) }
		</div>
	)
}

function IngredientWarningList() {
	return (
		<div>
			<h1>IngredientWarningList</h1>
		</div>
	)
}

const mapStateToProps = (state/*, props*/) => {
	return {
		rawMaterials: state.productionPlanning.data.rm,
		workInProgress: state.productionPlanning.data.wip,
		ui: state.productionPlanning.ui,
	}
}

export default connect(mapStateToProps)(ProductionPlanning)
