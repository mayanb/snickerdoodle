import React from 'react'
import Button from '../Card/Button'

export default function RecipeCreateHeader({onOpenAddRecipeForm, onCancel, isAddingRecipe}) {
	let button = isAddingRecipe
		? <Button onClick={onCancel}>Cancel</Button>
		: <Button type='primary' onClick={onOpenAddRecipeForm}>Add recipe</Button>
	
	return (
		<div className='process-attributes-header'>
			<span>Log fields</span>
			{button}
		</div>
	)
}