import React from 'react'
import {gerund} from '../../utilities/stringutils'
import Card from '../Card/Card'
import CardRule from '../Card/CardRule'
import Button from '../Card/Button'
import ProductFormula from './ProductFormula'
import AddNewFormula from './AddNewFormula'
import StartAddingFormula from './StartAddingFormula'
import './styles/formulasection.css'

export default class ProductFormulaSection extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			deletable: false,
		}
		this.handleEdit = this.handleEdit.bind(this)
	}

	render() {
		let {formulas, product_type, isAddingFormula, process_type, attributes} = this.props
		let process_id, process_name = ""
		if (process_type) {
			process_id = process_type.id;
			process_name = process_type.name
		} else {
			let attr = (formulas[0].attribute_obj || formulas[0].attribute)
			process_id = attr.process_type
			process_name = attr.process_name
		}

		return (
			<Card nopadding>
				<SectionHeader title={gerund(process_name)} onEdit={this.handleEdit} deletable={this.state.deletable}/>
				<CardRule />
				{
					formulas.map(function (f, i) {
						return <ProductFormula deletable={this.state.deletable} key={i} index={i} attributes={attributes} {...f} />
					}, this)
				}
				{ isAddingFormula ? 
						<AddNewFormula process_type={process_id} product_type={product_type} attributes={attributes} /> :
						<StartAddingFormula process_type={process_id}/>
				}
			</Card>
		)
	}

	handleEdit() {
		this.setState({deletable: !this.state.deletable})
	}

}

function SectionHeader(props) {
	return (
		<div className="recipe-process-header">
			<span>{props.title}</span>
			<Button link onClick={props.onEdit}>{props.deletable?'Cancel':'Edit'}</Button>
		</div>
	)
}

