import React from 'react'
import { connect } from 'react-redux'
import ApplicationSectionHeader from '../Application/ApplicationSectionHeader'
import ObjectListHeader from '../ObjectList/ObjectListHeader'
import ObjectList from '../ObjectList/ObjectList'
import InProgressListRow from './InProgressListRow'
import WarningListRow from './WarningListRow'
import ProductionAside from './ProductionAside'
import ProductionPlanningFilters from './ProductionPlanningFilters'
import { RawMaterialTimeline } from './RawMaterialTimeline'
import Table from '../Table/Table'
import Img from '../Img/Img'
import * as actions from './ProductionPlanningActions'
import './styles/productionplanning.css'

const CHART_WIDTH = 900

export class ProductionPlanning extends React.Component {
	constructor(props) {
		super(props)
		this.state = { 
			selectedProcessId: null, 
			selectedProductId: null,
			selectedProcessDetail: null,
			selectedProductDetail: null,
			expandWarningList: false,
			ordering: 'creating_task__process_type__name'
		}

		this.renderInProgressTableHeader = this.renderInProgressTableHeader.bind(this)
		this.renderWarningTableHeader = this.renderWarningTableHeader.bind(this)
		this.handleReorder = this.handleReorder.bind(this)
		this.handleFilter = this.handleFilter.bind(this)
		this.toggleExpandWarningList = this.toggleExpandWarningList.bind(this)
		this.fetchInventories = this.fetchInventories.bind(this)
	}

	componentDidMount() {
		this.setDefaultFilters()
	}

	componentWillReceiveProps(nextProps) {
		const { processes, products } = this.props
		const { selectedProcessId, selectedProductId } = this.state
		if (selectedProcessId && processes.length !== nextProps.processes.length) {
			const selectedProcessDetail = this.getDetail(selectedProcessId, nextProps.processes)
			this.setState({ selectedProcessDetail })
		}
		if (selectedProductId && products.length !== nextProps.products.length) {
			const selectedProductDetail = this.getDetail(selectedProductId, nextProps.products)
			this.setState({ selectedProductDetail })
		}
	}

	render() {
		const { ui, rawMaterials, inProgress, warningList } = this.props
		const { 
			selectedProcessId, 
			selectedProductId, 
			selectedProcessDetail, 
			selectedProductDetail,
			expandWarningList
		} = this.state
		return (
			<div className='production-planning-container'>
				<ApplicationSectionHeader>Production Planning</ApplicationSectionHeader>
				<div className='production-planning-body'>
					<div className='production-planning-main'>
						<ProductionPlanningFilters 
							onFilter={this.handleFilter}
							selectedProcessId={selectedProcessId}
							selectedProductId={selectedProductId} 
						/>
						{selectedProcessId && selectedProductId && 
							<div className='production-planning-content'>
								{ (ui.isFetchingRawMaterials || (rawMaterials && rawMaterials.length > 0)) && 
								<div>
									{ selectedProcessDetail && selectedProductDetail && 
										<div className='content-title'>{`Ingredients needed for ${selectedProcessDetail.name} ${selectedProductDetail.code}`}</div>
									}
									<RawMaterialTimeline 
										isFetchingData={ui.isFetchingRawMaterials}
										width={CHART_WIDTH} 
										data={rawMaterials}
									/>
								</div>
								}
								{ !ui.isFetchingRawMaterials && warningList && warningList.length > 0 &&
								<ObjectList className='warning-list-container'>
									<div className='warning-title' onClick={this.toggleExpandWarningList}>
										<Img src='warning@2x' height="20px" />
										<div style={{'marginLeft': '10px'}}>{`Ingredient supply getting low: ${formatWarningNames(warningList)}`}</div>
										<div className='toggle-list'>{ expandWarningList ? 'Hide List' : 'Show List' }</div>
									</div>
									{ this.state.expandWarningList && 
									<Table
										ui={ui}
										data={warningList}
										TitleRow={this.renderWarningTableHeader}
										Row={WarningListRow}
										isFetchingData={ui.isFetchingRawMaterials}
									/>
									}
								</ObjectList>
								}

								{ (ui.isFetchingInProgress || (inProgress && inProgress.length > 0)) &&
								<ObjectList className='in-progress-list-container'>
									{ selectedProcessDetail && selectedProductDetail && 
										<div className='content-title'>{`In-Progress Ingredients for ${selectedProcessDetail.name} ${selectedProductDetail.code}`}</div>
									}
									<Table
										ui={ui}
										data={inProgress}
										TitleRow={this.renderInProgressTableHeader}
										rowContext={{selectedProcess: selectedProcessDetail, selectedProduct: selectedProductDetail}}
										Row={InProgressListRow}
										isFetchingData={ui.isFetchingInProgress}
									/>
								</ObjectList> 
								}
							</div>
						}
					</div>
					<ProductionAside onSelect={this.handleFilter} />
				</div>
			</div>
		)
	}

	renderInProgressTableHeader() {
		const columns = [
			{ title: '', className: 'inv-icon', field: null },
			{ title: 'Product', className: 'inv-product', field: null },
			{ title: 'In Stock', className: 'inv-in-stock', field: null },
			{ title: 'Can Make', className: 'inv-can-make', field: null },
		]
		return (
			<ObjectListHeader columns={columns} onReorder={this.handleReorder} ordering={this.state.ordering} />
		)
	}

	renderWarningTableHeader() {
		const columns = [
			{ title: 'Product', className: 'inv-product', field: null },
			{ title: 'In Stock', className: 'inv-in-stock', field: null },
			{ title: 'Exhausted by', className: 'inv-date-exhausted', field: null },
		]
		return (
			<ObjectListHeader columns={columns} ordering={this.state.ordering}/>
		)
	}

	handleReorder(ordering) {
		this.setState({ ordering }, this.fetchInventories)
	}

	handleFilter(selectedProcessId, selectedProductId) {
		const { processes, products } = this.props
		this.setState({ 
			selectedProcessId, 
			selectedProductId,
			selectedProcessDetail: selectedProcessId ? this.getDetail(selectedProcessId, processes) : null,
			selectedProductDetail: selectedProductId ? this.getDetail(selectedProductId, products) : null,
		}, this.fetchInventories)

		const qs = new URLSearchParams(this.props.location.search)
		qs.set('selectedProcess', selectedProcessId ? selectedProcessId : '')
		qs.set('selectedProduct', selectedProductId ? selectedProductId : '')
		this.props.history.push({ search: qs.toString() })
	}

	getDetail(id, arr) {
		for (let i = 0; i < arr.length; i++) {
			if (id === String(arr[i].id)) {
				return arr[i]
			}
		}
		return null
	}

	toggleExpandWarningList() {
		this.setState({ expandWarningList: !this.state.expandWarningList })
	}

	fetchInventories() {
		const { selectedProcessId, selectedProductId, ordering } = this.state
		if (selectedProcessId && selectedProductId) {
			this.props.dispatch(actions.fetchRemainingRawMaterials(selectedProcessId, selectedProductId, 'rm', ordering))
			this.props.dispatch(actions.fetchInProgressInventory(selectedProcessId, selectedProductId, 'wip', ordering))
		}
	}

	setDefaultFilters() {
		const qs = new URLSearchParams(this.props.location.search)
		const selectedProcessId = qs.get('selectedProcess') ? qs.get('selectedProcess') : ''
		const selectedProductId = selectedProcessId && qs.get('selectedProduct') ? qs.get('selectedProduct') : ''
		this.handleFilter(selectedProcessId, selectedProductId)
	}
}

function formatWarningNames(warningList) {
	const names = []
	for (let i = 0; i < warningList.length; i++){
		names.push(warningList[i].product_type.name)
	}
	return names.join(', ')
}

function getWarningList(allData) {
	if (!allData) {
		return []
	}
	const warningList = []
	for (let i = 0; i < allData.length; i++) {
		if (allData[i].warning) {
			warningList.push(allData[i])
		}
	}
	return warningList
}

const mapStateToProps = (state/*, props*/) => {
	const warningList = getWarningList(state.productionPlanning.data.rawMaterials)
	return {
		rawMaterials: state.productionPlanning.data.rawMaterials,
		inProgress: state.productionPlanning.data.inProgress,
		processes: state.processes.data,
		products: state.products.data,
		ui: state.productionPlanning.ui,
		warningList,
	}
}

export default connect(mapStateToProps)(ProductionPlanning)