import React from 'react'
import { formatAmount } from '../../utilities/stringutils'
import ElementCard from '../Element/ElementCard'
import './styles/recipe.css'
import {icon} from '../TaskPage/TaskHelpers.jsx'
import Img from '../Img/Img'

export default function CollapsedRecipe(props) {
	const stage = props.process_type.name
	const ingredients = props.ingredients.length
	const { process_type } = props
	const recipeYield = formatAmount(process_type.default_amount, process_type.unit)
	const processIcon = process_type.icon
	return (
		<ElementCard className="recipe">
			<RecipeField className="list-item-stage">
				<Img className="icon-img" src={icon(processIcon)} />
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