import React from 'react'
import { connect } from 'react-redux'
import { Button,Select } from 'antd'
import ApplicationSectionHeader from '../Application/ApplicationSectionHeader'
import { ProductionAside } from './ProductionAside'
import { processProductFilter, formatOption } from '../../utilities/filters'
import './styles/productionplanning.css'

export class ProductionPlanning extends React.Component {
	constructor(props) {
		super(props)
		this.state = { 
			processes: [
				{
					id: 1,
					code: 'MP',
					name: 'Mellanger Pull'
				},
				{
					id: 2,
					code: 'L',
					name: 'Label'
				},
				{
					id: 3,
					code: 'F',
					name: 'Foil'
				},
				{
					id: 4,
					code: 'BW',
					name: 'Break and Winnow'
				},
			],
			products: [
				{
					id: 11,
					code: 'MM16',
					name: 'Maya Mountain 2016'
				},
				{
					id: 12,
					code: 'CV',
					name: 'Camino Verde'
				},
				{
					id: 13,
					code: 'CV17',
					name: 'Camino Verde 2017'
				},
			],
			selectedProcess: null, 
			selectedProduct: null
		}

		this.handleProcessTypeChange = this.handleProcessTypeChange.bind(this)
		this.handleProductTypeChange = this.handleProductTypeChange.bind(this)
	}

	componentDidMount() {

	}

	render() {
		let { ui } = this.props
		const { processes, products, selectedProcess, selectedProduct } = this.state
		return (
			<div className='production-planning-container'>
				<ApplicationSectionHeader>Production Planning</ApplicationSectionHeader>
				<div className='production-planning-body'>
					<div className='production-planning-content'>
						{ (!selectedProcess || !selectedProduct) && 
							<div className='selections'>
								<Select
									allowClear
									placeholder="Select process"
									filterOption={processProductFilter}
									onChange={this.handleProcessTypeChange}
									style={{width: '200px', marginRight: '20px'}}
								>
									{processes.map(p => 
										<Select.Option key={p.id} data={p}>
											{formatOption(p)}
										</Select.Option>
									)}
								</Select>
								<Select
									allowClear
									placeholder="Select product"
									filterOption={processProductFilter}
									onChange={this.handleProductTypeChange}
									disabled={!selectedProcess}
									style={{width: '200px', marginRight: '20px'}}
								>
									{products.map(p => 
										<Select.Option key={p.id} data={p}>
											{formatOption(p)}
										</Select.Option>
									)}
								</Select>
								<Button
									disabled={!selectedProcess || !selectedProduct}
								>
									Go
								</Button>
							</div>
						}
						<RawMaterialChart />
						<IngredientWarningList />
						<WorkInProgressList />
					</div>
					<ProductionAside />
				</div>
			</div>
		)
	}

	handleProcessTypeChange(selectedProcess) {
		this.setState({selectedProcess})
	}

	handleProductTypeChange(selectedProduct) {
		this.setState({selectedProduct})
	}

	handleSelectRow(i) {
		//this.props.dispatch(actions.selectInventory(i))
	}
}

function RawMaterialChart() {
	return (
		<div>Chart</div>
	)
}

function IngredientWarningList() {
	return (
		<div>IngredientWarningList</div>
	)
}

function WorkInProgressList() {
	return (
		<div>WorkInProgressList</div>
	)
}

const mapStateToProps = (state/*, props*/) => {
	return {
		data: state.inventory.data,
		ui: state.inventory.ui,
	}
}

export default connect(mapStateToProps)(ProductionPlanning)
