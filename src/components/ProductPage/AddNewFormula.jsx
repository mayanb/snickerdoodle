import React from 'react'
import { connect } from 'react-redux'
import * as actions from './ProductFormulaActions'
import { validateFormula } from './validateFormula'
import Select from '../Inputs/Select'
import FormulaField from './FormulaField'
import './styles/addformula.css'

class AddNewFormula extends React.Component {
	constructor(props) {
		super(props)
		this.handleChange = this.handleChange.bind(this)
		this.handleCancel = this.handleCancel.bind(this)
		this.handleConfirm = this.handleConfirm.bind(this)

		this.state = {
			attribute: this.props.attributes[0],
			comparator: this.props.comparators[0],
			formula: "",
			formulaError: "",
			submitted: false
		}
	}

	render() {
		return (
			<div>
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
							searchable={false}
							styleType="medium-gray"
							name="comparator"
							value={this.state.comparator}
							valueKey='value'
							labelKey='value'
							onChange={(val) => this.handleChange('comparator', val)}
							options={this.props.comparators}
						/>
					</div>
					<div className="rhs">
						<FormulaField
							value={this.state.formula}
							onChange={(val) => this.handleChange('formula', val)}
						/>
					</div>
					<div className="add-buttons">
						<i className="material-icons affirm" onClick={this.handleConfirm}>check</i>
						<i className="material-icons cancel" onClick={this.handleCancel}>close</i>
					</div>
				</div>
				{this.displayError() && FormulaError(this.state.formulaError)}
			</div>
		)
	}

	displayError() {
		return this.state.formulaError && this.state.submitted
	}

	handleChange(key, value) {
		this.setState({ [key]: value }, this.setFormulaError)
	}

	handleCancel() {
		this.props.dispatch(actions.finishAddingFormula())
	}

	handleConfirm() {
		this.setState({
			submitted: true,
			formulaError: formulaError(this.state.formula)
		}, this.saveFormula)
	}

	setFormulaError() {
		this.setState({ formulaError: formulaError(this.state.formula) })
	}

	saveFormula() {
		let data = {
			attribute: this.state.attribute.id,
			comparator: this.state.comparator.value,
			product_type: this.props.product_type,
			formula: this.state.formula,
			is_trashed: false,
		}
		if (!this.state.formulaError) {
			this.props.dispatch(actions.postCreateFormula(data))
		}
	}
}

function formulaError(formula) {
	if (!formula) {
		return 'Must enter a formula'
	} else if (!validateFormula(formula)) {
		return 'Formula is invalid'
	} else {
		return ''
	}
}

function FormulaError(error) {
	return (
		<div className="form-error">{error}</div>
	)
}


const mapStateToProps = (state, props) => {
	let process_type = state.processes.data.find(e => String(e.id) === String(props.process_type))
	return {
		attributes: process_type.attributes,
		comparators: [{ value: '=' }, { value: '<' }, { value: '>' }]
	}
}

export default connect(mapStateToProps)(AddNewFormula)