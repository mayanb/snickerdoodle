import React from 'react'
import { Input } from 'antd'
import { RecipeSelect } from './RecipeSelect'
import './styles/recipeingredient.css'

export default function Ingredient(props) {
	let { index, ingredient, processes, products, onRemove, onChange, shouldHighlightEmpty } = props
	let process_obj = processes.find(e => e.id === ingredient.process_type)
	let unit = process_obj ? process_obj.unit : "unit"
	return (
			<div className="recipe-ingredient">
				<Input.Group compact style={{flex: 2}}>
					<RecipeSelect 
						value={ingredient.process_type}
						onSelect={(v) => onChange(index, 'process_type', v)}
						style={{width: '50%', border: (shouldHighlightEmpty && !ingredient.process_type) && '1px solid red'}}
						data={processes || []}
					/>
					<RecipeSelect 
						placeholder="select a product"
						value={ingredient.product_type}
						onSelect={(v) => onChange(index, 'product_type', v)}
						style={{width: '50%', border: (shouldHighlightEmpty && !ingredient.product_type) && '1px solid red'}}
						data={products || []}
					/>
				</Input.Group>
				<Input 
					style={{flex: 1, marginLeft: "8px", visibility: (process_obj?'visible':'hidden')}} 
					addonAfter={unit} 
					defaultValue="0"
					value={ingredient.amount}
					onChange={e => onChange(index, 'amount', e.target.value)}
				/>
				<i className="material-icons" onClick={() => onRemove(index)}>close</i>
			</div>
	)
}