import React from 'react'
import { connect } from 'react-redux'
import update from 'immutability-helper'
import { Input } from 'antd'
import Button from '../Button/Button'
import ElementCard from '../Element/ElementCard'
import FormGroup from '../Inputs/FormGroup'
import { postCreateRecipe } from './RecipeActions'
import RecipeCreateHeader from './RecipeCreateHeader'
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
    this.handleToggle = this.handleToggle.bind(this)
		this.handleProcessChange = this.handleProcessChange.bind(this)
		this.handleInstructionsChange = this.handleInstructionsChange.bind(this)
  }
  
  render() {
    const { isAddingRecipe } = this.state
		const { processes, products } = this.props
	
		return (
      <div className='recipe-create'>
				<RecipeCreateHeader onSubmit={this.handleSubmit} onToggle={this.handleToggle} isAddingRecipe={isAddingRecipe} />
        
        {isAddingRecipe && (
        	<ElementCard selected className='recipe create-recipe' onDelete={this.handleToggle}>
	          <FormGroup className='process' label='Select a stage'>
							<RecipeSelect style={{ width: "100%", flex: 1 }} data={processes} onChange={this.handleProcessChange}/>
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
						/>
						<Button onClick={this.handleSubmit}>Save this recipe</Button>
        	</ElementCard>
        )}
      </div>
    )
  }
  
  handleSubmit() {
  	const { selectedProcessID, instructions } = this.state
		const { isCreatingItem } = this.props.ui
  	if (isCreatingItem || enteredDataIsInvalid(selectedProcessID, instructions)) {
  		return
		}
    const newRecipe = {
		  instructions: this.state.instructions,
			product_type_id: this.props.product.id,
			process_type_id: this.state.selectedProcessID,
    }
    this.props.dispatch(postCreateRecipe(newRecipe))
			.then(res => {
				this.setState({ isAddingRecipe: false })
			})
  }

  handleToggle() {
  	this.setState({ 
  		isAddingRecipe: !this.state.isAddingRecipe, 
  		selectedProcessID: null, 
  		instructions: '',
  		ingredients: [],
  	})
  }
	
	handleProcessChange(processID) {
		this.setState({ selectedProcessID: processID })
	}
	
	handleInstructionsChange(e) {
		this.setState({ instructions: e.target.value})
	}

	handleAddIngredient() {
		const ns = update(this.state.ingredients, {
			$push: [{product_type: null, process_type: null, amount: 0}]
		})
		this.setState({ ingredients: ns })
	}

	handleRemoveIngredient(index) {
		const ns = update(this.state.ingredients, {
			$splice: [[index, 1]]
		})
		this.setState({ ingredients: ns })
		console.log(ns)
	}

	handleChangeIngredient(index, key, value) {
		console.log(value)
		const ns = update(this.state.ingredients, {
			[index]: {
				$merge: { [key]: value }
			}
		})
		this.setState({ ingredients: ns })
	}
}

// function validateData(data) {
// 	let errors = {}
// 	errors.ingredients = []
// 	if (!processID) {
// 		errors.process_error = true
// 	}

// 	data.ingredients.forEach((e, i) => {
// 		if (!e.process) {
// 			errors.ingredients
// 		}
// 	})
// }

function enteredDataIsInvalid(processID, instructions) {
	return !(processID && instructions)
}

const mapStateToProps = (state) => {
  return {
    processes: state.processes.data,
		ui: state.recipes.ui,
		products: state.products.data,
	}
}

export default connect(mapStateToProps)(RecipeCreate)