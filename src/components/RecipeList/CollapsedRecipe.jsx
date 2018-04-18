import React from 'react'
import { formatAmount } from '../../utilities/stringutils'
import ElementCard from '../Element/ElementCard'
import './styles/recipe.css'
import {icon} from '../TaskPage/TaskHelpers.jsx'
import Img from '../Img/Img'

export default function CollapsedRecipe({recipe, index, isSelected, onDelete, onSelect}) {
	const { process_type, ingredients } = recipe
	const recipeYield = formatAmount(process_type.default_amount, process_type.unit)
	const processIcon = process_type.icon
	return (
		<ElementCard className="recipe" onDelete={() => onDelete(recipe, index)} onClick={() => onSelect(recipe)}>
			<RecipeField className="list-item-stage">
				<Img className="icon-img" src={icon(processIcon)} />
				<span>{process_type.name}</span>
			</RecipeField>
			<RecipeField className="list-item-ingredients">{ingredients.length}</RecipeField>
			<RecipeField className="list-item-recipe-yield"> {recipeYield}</RecipeField>
			{ isSelected && <span>{JSON.stringify(recipe.ingredients)}</span>}
		</ElementCard>
	)
}

function RecipeField({children, className}) {
	return <span className={`recipe-item-field ${className}`}>{children}</span>
}