import React from 'react'
import Ingredient from './RecipeIngredient'
import Button from '../Button/Button'

const COMPONENT_PREFIX = 'ril-'

export default function IngredientList(props) {
	const { products, processes, selectedProcess, ingredients, onChange, onRemove, onAdd, shouldHighlightEmpty } = props
	let { unit, default_amount: amount, code: processCode } = selectedProcess
	return (
		<div className="ingredient-list">
			<span style={{marginBottom: '8px', display: 'block'}}>What goes into a <span style={{fontWeight: 700}}>{amount} {unit} batch of {processCode}?</span></span>
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
						shouldHighlightEmpty={shouldHighlightEmpty}
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