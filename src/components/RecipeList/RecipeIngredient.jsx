import React from 'react'
import { Input } from 'antd'
import { RecipeSelect } from './RecipeSelect'
import './styles/recipeingredient.css'

export default function Ingredient(props) {
	let { index, ingredient, processes, products, onRemove, onChange, shouldHighlightEmpty } = props
	let process_obj = processes.find(e => e.id === ingredient.process)
	let unit = process_obj ? process_obj.unit : "unit"
	return (
			<div className="recipe-ingredient">
				<Input.Group compact style={{flex: 2}}>
					<RecipeSelect 
						value={ingredient.process}
						onSelect={(v) => onChange(index, 'process', v)}
						style={{width: '50%', border: (shouldHighlightEmpty && !ingredient.process) && '1px solid red'}}
						data={processes || []}
					/>
					<RecipeSelect 
						placeholder="select a product"
						value={ingredient.product}
						onSelect={(v) => onChange(index, 'product', v)}
						style={{width: "50%"}}
						data={products || []}
					/>
				</Input.Group>
				<Input style={{flex: 1, marginLeft: "8px", visibility: process_obj?'visible':'hidden'}} addonAfter={unit} defaultValue="0" />
				<i className="material-icons" onClick={() => onRemove(index)}>close</i>
			</div>
	)
}