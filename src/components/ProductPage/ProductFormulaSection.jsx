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
		let {formulas, product_type, isAddingFormula} = this.props
		let process_type = (formulas[0].attribute_obj || formulas[0].attribute).process_name
		return (
			<Card nopadding>
				<SectionHeader title={gerund(process_type)} onEdit={this.handleEdit} deletable={this.state.deletable}/>
				<CardRule />
				{
					formulas.map(function (f, i) {
						return <ProductFormula deletable={this.state.deletable} key={i} index={i} {...f} />
					}, this)
				}
				{ isAddingFormula ? 
						<AddNewFormula process_type={process_type} product_type={product_type} /> :
						<StartAddingFormula process_type={process_type}/>
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

