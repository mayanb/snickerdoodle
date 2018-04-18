import React from 'react'
import { connect } from 'react-redux'
import update from 'immutability-helper'
import { Input } from 'antd'
import Button from '../Button/Button'
import ElementCard from '../Element/ElementCard'
import FormGroup from '../Inputs/FormGroup'
import { postCreateRecipe } from './RecipeActions'
import './styles/recipecreate.css'
import { RecipeSelect } from './RecipeSelect'
import IngredientList from './IngredientList'

const { TextArea } = Input

class RecipeCreate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isAddingRecipe: false,
      selectedProcessID: null,
      instructions: '',
			ingredients: [],
		}

		this.handleAddIngredient = this.handleAddIngredient.bind(this)
		this.handleChangeIngredient = this.handleChangeIngredient.bind(this)
		this.handleRemoveIngredient = this.handleRemoveIngredient.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
		this.handleProcessChange = this.handleProcessChange.bind(this)
		this.handleInstructionsChange = this.handleInstructionsChange.bind(this)
  }
  
  render() {
		const { processes, products, recipes, ui, onToggle } = this.props

		let processes_disabled = update(processes, {})
		processes_disabled.forEach(e => {
			let recipe = recipes.find(r => r.process_type.id === e.id)
			if (recipe) e.disabled = true
		})
	
		return (
    	<ElementCard selected className='recipe create-recipe' onDelete={onToggle}>
        <FormGroup className='process' label='Select a stage'>
					<RecipeSelect style={{ width: "100%", flex: 1 }} data={processes_disabled} onChange={this.handleProcessChange}/>
        </FormGroup>
        <FormGroup className='instructions' label='Recipe instructions'>
          <TextArea rows={2} placeholder="(optional)" onChange={this.handleInstructionsChange}/>
        </FormGroup>
				<IngredientList 
					products={products} 
					processes={processes} 
					ingredients={this.state.ingredients}
					onAdd={this.handleAddIngredient}
					onChange={this.handleChangeIngredient}
					onRemove={this.handleRemoveIngredient}
					shouldHighlightEmpty={this.state.hasError}
				/>
				<Button isLoading={ui.isCreatingItem} onClick={this.handleSubmit}>Save this recipe</Button>
    	</ElementCard>
    )
  }
  
  handleSubmit() {
  	const { selectedProcessID, instructions, ingredients } = this.state
		const { ui, product } = this.props
  	if (ui.isCreatingItem) {
  		return
		}
		if (!validateData(this.state)) {
			this.setState({ hasError: true })
		}
		// otherwise, submit and close the box
    const newRecipe = {
		  instructions: instructions,
			product_type_id: product.id,
			process_type_id: selectedProcessID,
    }
    this.props.dispatch(postCreateRecipe(newRecipe, ingredients))
    this.props.onToggle()
  }
	
	handleProcessChange(processID) {
		this.setState({ selectedProcessID: processID, hasError: false })
	}
	
	handleInstructionsChange(e) {
		this.setState({ instructions: e.target.value, hasError: false })
	}

	handleAddIngredient() {
		const ns = update(this.state.ingredients, {
			$push: [{product_type: undefined, process_type: undefined, amount: 0}]
		})
		this.setState({ ingredients: ns, hasError: false })
	}

	handleRemoveIngredient(index) {
		const ns = update(this.state.ingredients, {
			$splice: [[index, 1]]
		})
		this.setState({ ingredients: ns, hasError: false })
	}

	handleChangeIngredient(index, key, value) {
		const ns = update(this.state.ingredients, {
			[index]: {
				$merge: { [key]: value }
			}
		})
		this.setState({ ingredients: ns, hasError: false })
	}
}

function validateData(data) {
	if (!data.selectedProcessID || !data.instructions) {
		return false
	}
	let isValid = true
	data.ingredients.forEach((ingredient, i) => {
		if (!ingredient.process_type || !ingredient.product_type) {
			isValid = false
		}
	})
	return isValid
}

const mapStateToProps = (state) => {
  return {
    processes: state.processes.data,
		ui: state.recipes.ui,
		products: state.products.data,
		recipes: state.recipes.data,
	}
}

export default connect(mapStateToProps)(RecipeCreate)