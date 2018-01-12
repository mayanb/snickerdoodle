import React from 'react'
import {gerund} from '../../utilities/stringutils'
import Card from '../Card/Card'
import CardRule from '../Card/CardRule'
import Button from '../Card/Button'
import ProductFormula from './ProductFormula'
import AddNewFormula from './AddNewFormula'
import StartAddingFormula from './StartAddingFormula'
import './styles/formulasection.css'

export default function ProductFormulaSection(props) {
	let {formulas} = props
	let process_type = (formulas[0].attribute_obj || formulas[0].attribute).process_name
	return (
		<Card nopadding>
			<SectionHeader title={gerund(process_type)}/>
			<CardRule />
			{
				formulas.map(function (f, i) {
					return <ProductFormula key={i} index={i} {...f} />
				})
			}
			{ props.isAddingFormula ? 
					<AddNewFormula process_type={props.process_type} product_type={props.product_type} /> :
					<StartAddingFormula process_type={props.process_type}/>
			}
		</Card>
	)
}

function SectionHeader(props) {
	return (
		<div className="recipe-process-header">
			<span>{props.title}</span>
			<Button link>Add</Button>
		</div>
	)
}

