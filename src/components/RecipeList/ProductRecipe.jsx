import React from 'react'
import { formatAmount } from '../../utilities/stringutils';
import './styles/product-recipe-list-item.css'

export default function ProductRecipe(props) {
	console.log(props)
	const stage = props.product_type.name
	const ingredients = props.ingredients.length
	const { process_type } = props
	const recipeYield = formatAmount(process_type.default_amount, process_type.unit)
	return (
		<div className={"process-attr-wrapper " /*+ className*/}>
			<div className='process-attribute'>
				<div className='process-attr-inputs'>
					<RecipeField className="list-item-stage" text={stage}/>
					<RecipeField className="list-item-ingredients" text={ingredients}/>
					<RecipeField className="list-item-recipe-yield" text={recipeYield}/>
				</div>
			</div>
		</div>
	)
}

function RecipeField(props) {
	return (
		<div className="process-attribute-field">
			<span style={{fontWeight: props.main?"700":"300"}}>{props.text}</span>
		</div>
	)
}