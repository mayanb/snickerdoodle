import React from 'react'
import {connect} from 'react-redux'
import * as actions from './ProductFormulaActions'
import Button from '../Card/Button'
import Select from '../Inputs/Select'
import Input from '../Inputs/Input'
import './styles/addformula.css'

class AddNewFormula extends React.Component {
	constructor(props) {
		super(props)
		this.handleCancel = this.handleCancel.bind(this)
		this.handleConfirm = this.handleConfirm.bind(this)

		//  ('id', 'attribute', 'is_trashed', 'product_type', 'formula', 'comparator')
		this.state = {
			attribute: null,
			comparator: null,
			formula: null,
		}
	}

	render() {
		return (
			<div className="recipe-formula add-formula">
				<div className="lhs">
					<Select
						style='medium-gray' 	
						name="attribute"
						value={null}
						valueKey='id'
						labelKey='name'
						onChange={this.handleChange}
						options={[]}
					/>
				</div>
				<div className="comparator">
					<Select 
						style="medium-gray"
						name="comparator"
						value={null}
						valueKey='id'
						labelKey='name'
						onChange={this.handleChange}
						options={[]}x
					/>
				</div>
				<div className="rhs">
					<Input style="medium-gray" type="text"/>
				</div>
				<div className="datatype add-buttons">
					<i className="material-icons affirm" onClick={this.handleConfirm}>check</i>
					<i className="material-icons cancel" onClick={this.handleCancel}>close</i>
				</div>
				<div className="user">
					<span>&nbsp;</span>
				</div>
			</div>
		)
	}

	handleCancel() {
		this.props.dispatch(actions.finishAddingFormula())
	}

	handleConfirm() {
		this.props.dispatch(actions.postCreateFormula())
	}
}


const mapStateToProps = (state/*, props*/) => {
  return {}
}

export default connect(mapStateToProps)(AddNewFormula)