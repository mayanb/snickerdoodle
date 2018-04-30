import React from 'react'
import Ingredient from './RecipeIngredient'

const COMPONENT_PREFIX = 'ril-'

export default function IngredientList(props) {
	const { products, processes, selectedProcess, selectedProduct, ingredients, onChange, onRemove, shouldHighlightEmpty } = props
	return (
		<div className="ingredient-list">
		{(selectedProcess && selectedProduct) && <Title selectedProduct={selectedProduct} selectedProcess={selectedProcess} />}
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
						disabled={props.disabled}
					/>
				})
			}
		</div>
	)
}

function Title({ selectedProcess, selectedProduct }) {
	let prod_name = selectedProduct.name
	let { unit, default_amount: amount, name } = selectedProcess
	// name should be in past tense (roast -> roasted, melanging -> melanged)
	return (
		<span style={{marginBottom: '8px', display: 'block'}}>
			What goes into a&nbsp;
			<span style={{fontWeight: 700}}>{amount} {unit} batch of {name} {prod_name}?</span>
		</span>
	)
}