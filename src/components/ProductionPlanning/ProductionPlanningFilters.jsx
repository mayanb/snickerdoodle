import React from 'react'
import { connect } from 'react-redux'
import { Select } from 'antd'
import { processProductFilter, formatOption } from '../../utilities/filters'
import * as processesActions from '../Processes/ProcessesActions'
import * as productsActions from '../Products/ProductsActions'
import './styles/productionplanningfilters.css'

class ProductionPlanningFilters extends React.Component {
	constructor(props) {
		super(props)

        this.props.dispatch(processesActions.fetchProcesses())
        this.handleProcessTypeChange = this.handleProcessTypeChange.bind(this)
        this.handleProductTypeChange = this.handleProductTypeChange.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedProcessId && this.props.selectedProcessId !== nextProps.selectedProcessId) {
            this.props.dispatch(productsActions.fetchProducts({process: nextProps.selectedProcessId}))
        }
    }

	render() {
        const { selectedProcessId, selectedProductId, isFetchingData, processes, products } = this.props
		return (
            <div className='production-planning-filters'>
                <Select
                    showSearch
                    allowClear
                    value={processes.length > 0 && selectedProcessId ? selectedProcessId : undefined}
                    placeholder="Select process"
                    filterOption={processProductFilter}
                    onChange={this.handleProcessTypeChange}
                    style={{width: '300px', marginRight: '20px'}}
                    notFoundContent={ isFetchingData ? 'Loading...' : 'Not Found'}
                >
                    { processes && processes.map(p => 
                        <Select.Option key={p.id} data={p}>
                            {formatOption(p)}
                        </Select.Option>
                    ) }
                </Select>
                <Select
                    showSearch
                    allowClear
                    value={products.length > 0 && selectedProductId ? selectedProductId : undefined}
                    placeholder="Select product"
                    filterOption={processProductFilter}
                    onChange={this.handleProductTypeChange}
                    disabled={!selectedProcessId}
                    style={{width: '300px', marginRight: '20px'}}
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

    handleProcessTypeChange(selectedProcessId) {
        this.props.dispatch(productsActions.fetchProducts({process: selectedProcessId}))
        this.props.onFilter(selectedProcessId, null)
	}

	handleProductTypeChange(selectedProductId) {
        this.props.onFilter(this.props.selectedProcessId, selectedProductId)
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