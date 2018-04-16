import React from 'react'
import Button from '../Button/Button'

export default function RecipeCreateHeader({onOpenAddRecipeForm, onCancel, isAddingRecipe}) {
	let button = isAddingRecipe
		? <Button type='gray' onClick={onCancel}>Cancel</Button>
		: <Button type='primary' onClick={onOpenAddRecipeForm}>Add recipe</Button>
	
	return (
		<div className='header'>
			<span>Recipes</span>
			{button}
		</div>
	)
}