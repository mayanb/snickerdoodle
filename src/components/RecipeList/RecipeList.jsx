import React from 'react'
import RecipeListItem from './RecipeListItem'
import Sortable from '../Sortable/Container'
import './styles/product-recipe-list.css'

export default class RecipeList extends React.Component {
	constructor(props) {
		super(props)
		const data = { // PLACEHOLDER DATA
			recipes: [
				{
					"id": 1,
					"instructions": "asdf",
					"product_type": {
						"id": 23,
						"name": "Camino Verde 85%",
						"code": "CV-85%",
						"created_by": 1,
						"is_trashed": false,
						"team_created_by": 1,
						"username": "pirates",
						"created_at": "2017-10-19T04:06:02.659679Z",
						"description": ""
					},
					"process_type": {
						"id": 15,
						"username": "pirates",
						"name": "Package",
						"code": "PG",
						"icon": "package.png",
						"attributes": [
							{
								"id": 53,
								"process_type": 15,
								"process_name": "Package",
								"name": "# of units",
								"rank": 0,
								"datatype": "NUMB"
							}
						],
						"unit": "bar",
						"x": "83.158",
						"y": "52.072",
						"created_by": 1,
						"output_desc": "finished bars",
						"created_by_name": "pirates_alabama",
						"default_amount": 10,
						"team_created_by": 1,
						"team_created_by_name": "alabama",
						"is_trashed": false,
						"created_at": "2017-10-19T04:06:02.595496Z",
						"last_used": "2018-04-11T19:16:35.167398Z"
					},
					"ingredients": [1,1,1,1] // DUMMY DATA
				},
				{
					"id": 2,
					"instructions": "asdf",
					"product_type": {
						"id": 23,
						"name": "David Mountain",
						"code": "CV-85%",
						"created_by": 1,
						"is_trashed": false,
						"team_created_by": 1,
						"username": "pirates",
						"created_at": "2017-10-19T04:06:02.659679Z",
						"description": ""
					},
					"process_type": {
						"id": 15,
						"username": "pirates",
						"name": "Winnow",
						"code": "PG",
						"icon": "package.png",
						"attributes": [
							{
								"id": 53,
								"process_type": 15,
								"process_name": "Package",
								"name": "# of units",
								"rank": 0,
								"datatype": "NUMB"
							}
						],
						"unit": "bar",
						"x": "83.158",
						"y": "52.072",
						"created_by": 1,
						"output_desc": "finished bars",
						"created_by_name": "pirates_alabama",
						"default_amount": 10,
						"team_created_by": 1,
						"team_created_by_name": "alabama",
						"is_trashed": false,
						"created_at": "2017-10-19T04:06:02.595496Z",
						"last_used": "2018-04-11T19:16:35.167398Z"
					},
					"ingredients": [2,2,2,2,2]
				},
				// {
				// 	state: 'W-Winnow',
				// 	ingredients: 5,
				// 	recipe_yield: 20,
				// 	yield_unit: 'Bag',
				// },
			]
		}
		this.state = {
			data: data,
		}
	}
	
	render() {
		const { recipes } = this.state.data
		
		return (
			<div className="product-recipe-list">
				<div className="product-recipe-list-header">
					<span>Stage</span>
					<span>Ingredients</span>
					<span>Recipe Yield</span>
				</div>
				<Sortable
					cards={recipes}
					canEdit={false}
					renderer={RecipeListItem}
				/>
			</div>
		)
	}
}
