import React from 'react'
import { connect } from 'react-redux'
import CollapsedRecipe from './CollapsedRecipe'
import Sortable from '../Sortable/Container'
import * as processActions from '../Processes/ProcessesActions'
import * as recipeActions from './RecipeActions'
import RecipeCreate from './RecipeCreate'
import './styles/recipelist.css'

class RecipeList extends React.Component {
	componentDidMount() {
    this.props.dispatch(processActions.fetchProcesses())
		this.props.dispatch(recipeActions.fetchRecipes({ product_type: this.props.product.id }))
  }
	
	render() {
		const { recipes, product } = this.props
		
		return (
			<div className="product-recipe-list">
				<RecipeCreate product={product}/>
				<div className="product-recipe-list-header">
					<span>Stage</span>
					<span>Ingredients</span>
					<span>Recipe Yield</span>
				</div>
				<Sortable
					cards={recipes}
					canEdit={false}
					renderer={CollapsedRecipe}
				/>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
  return {
    processes: state.processes.data,
		recipes: state.recipes.data,
  }
}

export default connect(mapStateToProps)(RecipeList)
