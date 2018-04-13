import React from 'react'
import { formatAmount } from '../../utilities/stringutils'
import ReactImageFallback from 'react-image-fallback'
import ElementCard from '../Element/ElementCard'
import './styles/recipe.css'

export default function CollapsedRecipe(props) {
	const stage = props.product_type.name
	const ingredients = props.ingredients.length
	const { process_type } = props
	const recipeYield = formatAmount(process_type.default_amount, process_type.unit)
	const icon = process_type.icon
	return (
		<ElementCard className="recipe">
			<RecipeField className="list-item-stage">
				<RenderIconOrImage img={icon}/>
				<span>{stage}</span>
			</RecipeField>
			<RecipeField className="list-item-ingredients">{ingredients}</RecipeField>
			<RecipeField className="list-item-recipe-yield"> {recipeYield}</RecipeField>
		</ElementCard>
	)
}

function RecipeField({children, className}) {
	return <span className={`recipe-item-field ${className}`}>{children}</span>
}

function RenderIconOrImage(props) {
	var symbol = false
	if (props.img) {
		let errorImg = `${process.env.PUBLIC_URL}/img/default@3x.png`
		symbol = <ReactImageFallback src={process.env.PUBLIC_URL + `/img/${props.img}@3x.png`} fallbackImage={errorImg}/>
	} else if (props.icon) {
		symbol = <span><i className="material-icons arrow">{props.icon}</i></span>
	}
	return symbol
}