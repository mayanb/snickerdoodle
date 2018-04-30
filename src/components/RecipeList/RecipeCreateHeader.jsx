import React from 'react'
import Button from '../Button/Button'

export default function RecipeCreateHeader({ onToggle, isAddingRecipe }) {
	let button = isAddingRecipe
		? <Button type='gray' onClick={onToggle}>Cancel</Button>
		: <Button type='primary' onClick={onToggle}>Add recipe</Button>
	
	return (
		<div className='recipe-create-header'>
			<span>Recipes</span>
			{button}
		</div>
	)
}