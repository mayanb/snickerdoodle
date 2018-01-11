import React from 'react'
import {connect} from 'react-redux'
import Icon from '../Card/Icon'
import * as actions from './ProductFormulaActions'
import ProductFormulaSection from './ProductFormulaSection'
import './styles/productpage.css'

let product = {name: "Camino Verde 17", code: "CV17"}

class ProductPage extends React.Component {

	componentDidMount() {
		 this.props.dispatch(actions.fetchFormulas())
	}

	render() {
		let {ui, data} = this.props
		let formulas = data //this.props.data
		let groupedFormulas = groupFormulas(formulas)

		return ( 
			<div className="productpage">
				<ProductHeader {...product}/>
				<div className="recipe">
					{
						Object.keys(groupedFormulas).map(function (process_type, i) {
							return <ProductFormulaSection 
								key={i} 
								process_type={process_type}
								formulas={groupedFormulas[process_type]} 
								isAddingFormula={ui.isAddingFormula === process_type}
							/>
						})
					}
				</div>
			</div>
		)
	}
}

function groupFormulas(formulas) {
	let groupedFormulas = {}
	formulas.map(function (formula, i) {
		let process_type = formula.attribute.process_type
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
			<Icon size="44px" content={props.code}/>
			<div>
				<span className="product-code">{props.code}</span>
				<span className="product-name">{props.name}</span>
			</div>
		</div>
	)
}

const mapStateToProps = (state/*, props*/) => {
  return {
    data: state.formulas.data,
    ui: state.formulas.ui
  }
}

export default connect(mapStateToProps)(ProductPage)