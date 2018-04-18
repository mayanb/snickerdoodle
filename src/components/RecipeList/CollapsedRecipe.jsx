import React from 'react'
import pluralize from 'pluralize'
import { Alert, Input } from 'antd'
import ElementCard from '../Element/ElementCard'
import './styles/recipe.css'
import {icon} from '../TaskPage/TaskHelpers.jsx'
import Img from '../Img/Img'
import IngredientList from './IngredientList'
import { Slide } from '../Animations/Animations'
import FormGroup from '../Inputs/FormGroup'

const { TextArea } = Input

const COMPONENT_PREFIX = 'recipe-list-item-'

export default function CollapsedRecipe({recipe, index, isSelected, onDelete, onSelect, processes, products}) {
	const { process_type, ingredients, instructions } = recipe
	const processIcon = process_type.icon
	return (
		<ElementCard onDelete={() => onDelete(recipe, index)} onClick={() => onSelect(recipe)} selected={isSelected}>
			<div className="recipe">
				<RecipeField className="list-item-stage">
					<Img className="icon-img" src={icon(processIcon)} />
					<span>({process_type.code}) {process_type.name}</span>
				</RecipeField>
				<RecipeField className="list-item-ingredients">{ingredients.length} { pluralize('ingredients', ingredients.length) }</RecipeField>
				<RecipeField className="list-item-recipe-yield">{instructions}</RecipeField>
			</div>
			<Slide>
			{ isSelected && <ExpandedRecipeContent recipe={recipe} processes={processes} key={COMPONENT_PREFIX + 'expanded'} products={products} />}
			</Slide>
		</ElementCard>
	)
}

function RecipeField({children, className}) {
	return <div className={`recipe-item-field ${className}`}>{children}</div>
}

function ExpandedRecipeContent({recipe, processes = [], products = []}) {
	let ingredientsMap = recipe.ingredients.map(e => {
		return { process_type: e.process_type.id, product_type: e.product_type.id, amount: parseFloat(e.amount) }
	})

	return (
		<div>
			<FormGroup className='instructions' label='Recipe instructions'>
        <TextArea rows={2} disabled>{recipe.instructions}</TextArea>
      </FormGroup>
			<IngredientList
				products={products} 
				processes={processes} 
				ingredients={ingredientsMap}
				selectedProcess={recipe.process_type}
				selectedProduct={recipe.product_type}
				disabled={true}
			/>
			<Alert message="Editing a recipe is coming soon! Unil then, you can delete the recipe and create a new one with all the updates you need." type="info" />
		</div>
	)
}