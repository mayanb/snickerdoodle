import React from 'react'
import {gerund} from '../../utilities/stringutils'
import Card from '../Card/Card'
import CardRule from '../Card/CardRule'
import Button from '../Card/Button'
import ProductFormula from './ProductFormula'
import AddNewFormula from './AddNewFormula'

export default function ProductFormulaSection(props) {
	let {formulas} = props
	return (
		<Card nopadding>
			<SectionHeader title={gerund(formulas[0].attribute.process_type_name)}/>
			<CardRule />
			<div className="recipe-wrapper">
			<AddNewFormula />
			{
				formulas.map(function (f, i) {
					return <ProductFormula key={i} {...f} />
				})
			}
			</div>
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