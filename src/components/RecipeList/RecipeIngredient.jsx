import React from 'react'
import { Input } from 'antd'
import { RecipeSelect } from './RecipeSelect'
import './styles/recipeingredient.css'
import FormGroup from '../Inputs/FormGroup'

export default function Ingredient(props) {
	return (
		<FormGroup>
			<div className="recipe-ingredient">
				<Input.Group compact style={{flex: 2}}>
					<RecipeSelect style={{width: "50%"}} data={props.processes || []} />
					<RecipeSelect style={{width: "50%"}} data={props.products || []} />
				</Input.Group>
				<Input style={{flex: 1, marginLeft: "8px"}} addonAfter="kilograms" defaultValue="0" />
			</div>
		</FormGroup>
	)
}