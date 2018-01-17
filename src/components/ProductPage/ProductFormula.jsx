import React from 'react'
import { connect } from 'react-redux'
import CardRule from '../Card/CardRule'
import './styles/formula.css'
import Icon from '../Card/Icon'
import * as actions from './ProductFormulaActions'

class ProductFormula extends React.Component {

	render() {
		let { formula, comparator, dispatch, id, index, deletable, attributes } = this.props
		let attribute = this.props.attribute_obj || this.props.attribute
		return (
			<div>
				<div className="recipe-formula">
					<div className="lhs">
						<span className="name">{attribute.name}</span>
					</div>
					<div className="comparator">
						<span>{comparator}</span>
					</div>
					<div className="rhs">
						<span>{Formula(formula, attributes)}</span>
					</div>
					<div className="datatype">
						<span>{attribute.datatype}</span>
					</div>
					<div className="user">
						<Icon size="20px" content="ishita" />
					</div>
					{ deletable ? 
						<div className="delete">
							<i className="material-icons" onClick={() => deleteFormula(id, index, dispatch)}>remove_circle</i>
						</div> :
						null
					}
				</div>
				<CardRule />
			</div>
		)
	}
}

function Pill(name) {
	return <div className="attribute-pill">{name}</div>
}

function Formula(formula, attributes) {
	const formulaHtml = []
	const regEx = /{[0-9]+}/g;
	let result
	let lastMatchIndex = 0
	while((result = regEx.exec(formula)) !== null) {
		const thisMatchIndex = result.index
		formulaHtml.push(formula.slice(lastMatchIndex, thisMatchIndex))
		const attributeId = result[0].slice(1, -1);
		const attribute = attributes.find(attr => String(attr.id) === attributeId)
		const name = attribute ? attribute.name : 'N/A'
		formulaHtml.push(Pill(name))
		lastMatchIndex = thisMatchIndex + result[0].length
	}
	formulaHtml.push(formula.slice(lastMatchIndex, formula.length))
	return (
		<div>{formulaHtml}</div>
	)
}

function deleteFormula(formulaId, index, dispatch) {
	dispatch(actions.postDeleteFormula(formulaId, index, () => {}))
}

const mapStateToProps = (state, props) => {
	return {
	}
}

export default connect(mapStateToProps)(ProductFormula)
