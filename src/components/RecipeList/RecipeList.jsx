import React from 'react'
import { connect } from 'react-redux'
import CollapsedRecipe from './CollapsedRecipe'
import * as processActions from '../Processes/ProcessesActions'
import * as productActions from '../Products/ProductsActions'
import * as recipeActions from './RecipeActions'
import RecipeCreate from './RecipeCreate'
import './styles/recipelist.css'
import { Modal } from 'antd'

const { confirm } = Modal

class RecipeList extends React.Component {
	constructor(props) {
		super(props)
		this.showConfirmDelete = this.showConfirmDelete.bind(this)
	}

	componentDidMount() {
    this.props.dispatch(processActions.fetchProcesses())
    this.props.dispatch(productActions.fetchProducts())
		this.props.dispatch(recipeActions.fetchRecipes({ product_type: this.props.product.id }))
  }
	
	render() {
		const { recipes, product } = this.props
		
		return (
			<div className="product-recipe-list">
				<RecipeCreate product={product}/>
				{
					recipes.map((e, i) => {
						return <CollapsedRecipe recipe={e} key={i} index={i} onDelete={this.showConfirmDelete}/>
					})
				}
			</div>
		)
	}

	handleDeleteRecipe(recipe, index) {
		this.props.dispatch(recipeActions.postDeleteRecipe(recipe, index))
	}

	showConfirmDelete(recipe, index) {
		confirm({
	    title: `Are you sure you want to delete the recipe for ${recipe.process_type.name} ${recipe.product_type.name} (${recipe.process_type.code}-${recipe.product_type.code})?`,
	    content: '',
	    okText: 'Yes, I\'m sure',
	    okType: 'danger',
	    onOk: () => this.handleDeleteRecipe(recipe, index),
	    onCancel: () => {}
  	})
	}
}

const mapStateToProps = (state) => {
  return {
    processes: state.processes.data,
		recipes: state.recipes.data,
  }
}

export default connect(mapStateToProps)(RecipeList)
