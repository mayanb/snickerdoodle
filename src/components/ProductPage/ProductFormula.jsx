import React from 'react'
import { connect } from 'react-redux'
import CardRule from '../Card/CardRule'
import './styles/formula.css'
import Icon from '../Card/Icon'
import Button from '../Card/Button'
import * as actions from './ProductFormulaActions'

class ProductFormula extends React.Component {

	render() {
		let { formula, comparator, dispatch, id, index, deletable } = this.props
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
						<span>{formula}</span>
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

function deleteFormula(formulaId, index, dispatch) {
	dispatch(actions.postDeleteFormula(formulaId, index, () => {}))
}

const mapStateToProps = (state, props) => {
	return {
	}
}

export default connect(mapStateToProps)(ProductFormula)
