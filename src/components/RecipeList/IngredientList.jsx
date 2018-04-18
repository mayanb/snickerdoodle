import React from 'react'
import FormLabel from '../Inputs/FormLabel'
import Ingredient from './RecipeIngredient'
import Button from '../Button/Button'

const COMPONENT_PREFIX = 'ril-'

export default function IngredientList(props) {
	const { products, processes, ingredients, onChange, onRemove, onAdd } = props
	return (
		<div className="ingredient-list">
			<FormLabel>Ingredients</FormLabel>
			{
				ingredients.map((e, i) => {
					return <Ingredient 
						key={COMPONENT_PREFIX + i} 
						index={i}
						products={products}
						processes={processes}
						ingredient={e}
						onChange={onChange}
						onRemove={onRemove}
					/>
				})
			}
			<Button type="dashed" onClick={onAdd}>
				<div className="add-ingredient-button">
					<i className="material-icons">add</i>
					<span>Add an ingredient</span>
				</div>
			</Button>
		</div>
	)
}