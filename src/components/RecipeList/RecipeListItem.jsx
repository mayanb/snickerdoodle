import React from 'react'
import { formatAmount } from '../../utilities/stringutils';
import './styles/product-recipe-list-item.css'

export default function RecipeList(props) {
	console.log(props)
	const stage = props.product_type.name
	const ingredients = props.ingredients.length
	const { process_type } = props
	const recipeYield = formatAmount(process_type.default_amount, process_type.unit)
	return (
		<div className={"process-attr-wrapper " /*+ className*/}>
			<div className='process-attribute'>
				<RecipeField className="list-item-stage" text={stage}/>
				<RecipeField className="list-item-ingredients" text={ingredients}/>
				<RecipeField className="list-item-recipe-yield" text={recipeYield}/>
			</div>
		</div>
	)
}

function RecipeField(props) {
	return <span className='recipe-item-field'>{props.text}</span>
}