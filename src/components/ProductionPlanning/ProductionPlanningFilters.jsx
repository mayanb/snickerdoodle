import React from 'react'
import { connect } from 'react-redux'
import { Select } from 'antd'
import { processProductFilter, formatOption } from '../../utilities/filters'
import * as processesActions from '../Processes/ProcessesActions'
import * as productsActions from '../Products/ProductsActions'

class ProductionPlanningFilters extends React.Component {
	constructor(props) {
		super(props)
		this.state = { 
			selectedProcess: null, 
			selectedProduct: null
		}

        this.handleProcessTypeChange = this.handleProcessTypeChange.bind(this)
        this.handleProductTypeChange = this.handleProductTypeChange.bind(this)
        this.handleFilter = this.handleFilter.bind(this)
	}

	componentDidMount() {
		this.props.dispatch(processesActions.fetchProcesses())
	}

	render() {
		const { isFetchingData, processes, products } = this.props
		const { selectedProcess, selectedProduct } = this.state
		return (
            <div className='selections'>
                <Select
                    allowClear
                    value={selectedProcess ? selectedProcess : undefined}
                    placeholder="Select process"
                    filterOption={processProductFilter}
                    onChange={this.handleProcessTypeChange}
                    style={{width: '200px', marginRight: '20px'}}
                    notFoundContent={ isFetchingData ? 'Loading...' : 'Not Found'}
                >
                    { processes && processes.map(p => 
                        <Select.Option key={p.id} data={p}>
                            {formatOption(p)}
                        </Select.Option>
                    ) }
                </Select>
                <Select
                    allowClear
                    value={selectedProduct ? selectedProduct : undefined}
                    placeholder="Select product"
                    filterOption={processProductFilter}
                    onChange={this.handleProductTypeChange}
                    disabled={!selectedProcess}
                    style={{width: '200px', marginRight: '20px'}}
                    notFoundContent={ isFetchingData ? 'Loading...' : 'Not Found'}
                >
                    { products && products.map(p => 
                        <Select.Option key={p.id} data={p}>
                            {formatOption(p)}
                        </Select.Option>
                    ) }
                </Select>
            </div>
		)
    }

    handleProcessTypeChange(selectedProcess) {
		this.props.dispatch(productsActions.fetchProducts({process: selectedProcess}))
		this.setState({selectedProcess, selectedProduct: null}, this.handleFilter)
	}

	handleProductTypeChange(selectedProduct) {
		this.setState({selectedProduct}, this.handleFilter)
    }
    
    handleFilter() {
        this.props.onFilter(this.state.selectedProcess, this.state.selectedProduct)
    }
}

const mapStateToProps = (state/*, props*/) => {
	const isFetchingData = state.processes.ui.isFetchingData || state.products.ui.isFetchingData
	return {
		processes: state.processes.data,
		products: state.products.data,
		isFetchingData: isFetchingData
	}
}

export default connect(mapStateToProps)(ProductionPlanningFilters)