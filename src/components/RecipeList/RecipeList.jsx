import React from 'react'
import { connect } from 'react-redux'
import Recipe from './Recipe'
import * as processActions from '../Processes/ProcessesActions'
import * as productActions from '../Products/ProductsActions'
import * as recipeActions from './RecipeActions'
import RecipeCreate from './RecipeCreate'
import './styles/recipelist.css'
import { Modal, Spin } from 'antd'
import {Slide} from '../Animations/Animations'
import RecipeCreateHeader from './RecipeCreateHeader'

const COMPONENT_PREFIX = 'product-recipe-list_'
const DESELECT = -1
const { confirm } = Modal

class RecipeList extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			isAddingRecipe: false,
		}
		this.showConfirmDelete = this.showConfirmDelete.bind(this)
		this.handleToggleCreate = this.handleToggleCreate.bind(this)
		this.handleSelectRecipe = this.handleSelectRecipe.bind(this)
	}

	componentDidMount() {
		this.props.dispatch(processActions.fetchProcesses())
		this.props.dispatch(productActions.fetchProducts())
		this.props.dispatch(recipeActions.fetchRecipes({ product_type: this.props.product.id }))
		this.props.dispatch(recipeActions.selectRecipe(DESELECT))
	}
	
	render() {
		const { recipes, product, ui } = this.props

		if (ui.isFetchingData) {
			return (
				<div className="element-spinner">
					<Spin size="large" />
				</div>
			)
		}
		
		return (
			<div className="product-recipe-list">
			<RecipeCreateHeader onToggle={this.handleToggleCreate} isAddingRecipe={this.state.isAddingRecipe || ui.isCreatingItem} />
			<Slide>
				{(this.state.isAddingRecipe || ui.isCreatingItem) && 
					<RecipeCreate key={COMPONENT_PREFIX + "create"} product={product} onToggle={this.handleToggleCreate}/>
				}
				{
					recipes.map((e, i) => {
						return (
							<Recipe 
								recipe={e} 
								key={COMPONENT_PREFIX + i} 
								index={i}
								isSelected={ ui.selectedItem === e.id }
								onDelete={this.showConfirmDelete}
								onSelect={this.handleSelectRecipe}
								processes={this.props.processes}
								products={this.props.products}
							/>
						)
					})
				}
				</Slide>
			</div>
		)
	}

	handleToggleCreate() {
		this.setState({ 
			isAddingRecipe: !this.state.isAddingRecipe, 
		})
		this.props.dispatch(recipeActions.selectRecipe(DESELECT))
	}

	handleSelectRecipe(recipe) {
		let { dispatch, ui } = this.props
		let toSelect = ui.selectedItem === recipe.id ? DESELECT : recipe.id
		dispatch(recipeActions.selectRecipe(toSelect))
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
    products: state.products.data,
		recipes: state.recipes.data,
		ui: state.recipes.ui,
  }
}

export default connect(mapStateToProps)(RecipeList)
