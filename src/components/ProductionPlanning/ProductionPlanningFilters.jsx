import React from 'react'
import { connect } from 'react-redux'
import { Select } from 'antd'
import { processProductFilter, formatOption } from '../../utilities/filters'
import * as processesActions from '../Processes/ProcessesActions'
import * as productsActions from '../Products/ProductsActions'

class ProductionPlanningFilters extends React.Component {
	constructor(props) {
		super(props)

        this.props.dispatch(processesActions.fetchProcesses())
        this.handleProcessTypeChange = this.handleProcessTypeChange.bind(this)
        this.handleProductTypeChange = this.handleProductTypeChange.bind(this)
	}

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedProcess && this.props.selectedProcess !== nextProps.selectedProcess) {
            this.props.dispatch(productsActions.fetchProducts({process: nextProps.selectedProcess}))
        }
    }

	render() {
		const { selectedProcess, selectedProduct, isFetchingData, processes, products } = this.props
		return (
            <div className='selections'>
                <Select
                    allowClear
                    value={processes.length > 0 && selectedProcess ? selectedProcess : undefined}
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
                    value={products.length > 0 && selectedProduct ? selectedProduct : undefined}
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
        this.props.onFilter(selectedProcess, null)
	}

	handleProductTypeChange(selectedProduct) {
        this.props.onFilter(this.props.selectedProcess, selectedProduct)
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