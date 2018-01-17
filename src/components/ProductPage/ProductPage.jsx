import React from 'react'
import {connect} from 'react-redux'
import Icon from '../Card/Icon'
import * as actions from './ProductFormulaActions'
import * as productActions from '../Products/ProductsActions'
import * as processActions from '../Processes/ProcessesActions'
import ProductFormulaSection from './ProductFormulaSection'
import ProductMenu from './ProductMenu'
import AddSection from './AddSection'
import './styles/productpage.css'

class ProductPage extends React.Component {

	componentDidMount() {
		let {id} = this.props.match.params
		this.props.dispatch(productActions.fetchProducts({id: id}))
		this.props.dispatch(processActions.fetchProcesses())
		this.props.dispatch(actions.fetchFormulas({product_type: id}))
	}

	render() {
		let {ui, data, product, dispatch} = this.props
		let formulas = data //this.props.data
		let groupedFormulas = groupFormulas(formulas)

		let all_process_types = []

		if (!product) {
			return <span>Loading... </span>
		}

		return ( 
			<div className="productpage">
				<ProductHeader product={product} dispatch={dispatch}/>
				<div className="recipe-wrapper">
					<div className="recipe">
						{
							Object.keys(groupedFormulas).map(function (process_type, i) {
								all_process_types.push({id: process_type})
								return <ProductFormulaSection 
									key={i} 
									product_type={product.id}
									formulas={groupedFormulas[process_type]} 
									isAddingFormula={parseInt(ui.isAddingFormula,10) === parseInt(process_type, 10)}
								/>
							})
						}
						{ this.renderAddSection(all_process_types) }
					</div>
  			</div>
			</div>
		)
	}

	renderAddSection(exclude) {
		let {ui, product} = this.props
		if (ui.isAddingSection) {
			return <ProductFormulaSection
				process_type={ui.isAddingSection}
				product_type={product.id}
				formulas={[]}
				isAddingFormula={true}
			/>
		} else return <AddSection exclude={exclude}/>
	}
}


function groupFormulas(formulas) {
	let groupedFormulas = {}
	formulas.forEach(function (formula, i) {
		console.log(formula)
		let process_type = (formula.attribute_obj || formula.attribute).process_type
		if (groupedFormulas[process_type])
			groupedFormulas[process_type].push(formula)
		else {
			groupedFormulas[process_type] = [formula]
		}
	})
	return groupedFormulas
}

function ProductHeader(props) {
	return (
		<div className="productheader">
			<Icon size="44px" content={props.product.code}/>
			<div>
				<span className="product-code">{props.product.code}</span>
				<span className="product-name">{props.product.name}</span>
			</div>
			<ProductMenu product={props.product} dispatch={props.dispatch}/>
		</div>
	)
}

const mapStateToProps = (state/*, props*/) => {
  return {
    data: state.formulas.data,
    ui: state.formulas.ui,
    product: state.products.data[0],
	  dispatch: state.dispatch
  }
}

export default connect(mapStateToProps)(ProductPage)