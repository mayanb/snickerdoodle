import React from 'react'
import {connect} from 'react-redux'
import * as actions from './ProductFormulaActions'
import Select from '../Inputs/Select'
import Input from '../Inputs/Input'
import './styles/addformula.css'

class AddNewFormula extends React.Component {
	constructor(props) {
		super(props)
		this.handleChange = this.handleChange.bind(this)
		this.handleCancel = this.handleCancel.bind(this)
		this.handleConfirm = this.handleConfirm.bind(this)

		this.state = {
			attribute: null,
			comparator: null,
			formula: "",
		}
	}

	render() {
		return (
			<div className="recipe-formula add-formula">
				<div className="lhs">
					<Select
						clearable={false}
						styleType='medium-gray' 	
						name="attribute"
						value={this.state.attribute}
						valueKey='id'
						labelKey='name'
						onChange={(val) => this.handleChange('attribute', val)}
						options={this.props.attributes}
					/>
				</div>
				<div className="comparator">
					<Select 
						clearable={false}
						styleType="medium-gray"
						name="comparator"
						value={this.state.comparator}
						valueKey='value'
						labelKey='value'
						onChange={(val) => this.handleChange('comparator', val)}
						options={[ {value: '='}, {value: '<'}, {value: '>'} ]}
					/>
				</div>
				<div className="rhs">
					<Input 
						styleType="medium-gray" 
						type="text" 
						value={this.state.formula}
						onChange={(e) => this.handleChange('formula', e.target.value)}
					/>
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

	handleChange(key, value) {
		this.setState({[key]: value})
	}

	handleCancel() {
		this.props.dispatch(actions.finishAddingFormula())
	}

	handleConfirm() {
		let data = {
			attribute: this.state.attribute.id,
			comparator: this.state.comparator.value,
			product_type: this.props.product_type,
			formula: this.state.formula,
			is_trashed: false,
		}
		this.props.dispatch(actions.postCreateFormula(data))
	}
}


const mapStateToProps = (state, props) => { 
	let process_type = state.processes.data.find(e => String(e.id) === String(props.process_type))
  return {
  	attributes: process_type.attributes
  }
}

export default connect(mapStateToProps)(AddNewFormula)