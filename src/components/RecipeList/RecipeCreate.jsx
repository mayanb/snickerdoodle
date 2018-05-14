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

const COMPONENT_PREFIX = 'recipe-create-'
const { TextArea } = Input
const ERROR_BORDER = '1px solid #FFABAB'

class RecipeCreate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isAddingRecipe: false,
      selectedProcessID: undefined,
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
		const { processes, products, ui, onToggle, product } = this.props
		const { selectedProcessID, hasError } = this.state
		return (
    	<ElementCard selected className='recipe create-recipe' onDelete={onToggle}>
        <FormGroup className='process' label='Select a stage'>
					<RecipeSelect 
						style={{ width: "100%", flex: 1, border: hasError && !selectedProcessID && ERROR_BORDER }} 
						disabledOptions={this.getDisabledProcesses()} 
						data={processes} 
						onChange={this.handleProcessChange}
					/>
        </FormGroup>
        <FormGroup className='instructions' label='Recipe instructions'>
          <TextArea rows={2} placeholder="(optional)" onChange={this.handleInstructionsChange}/>
        </FormGroup>
        { selectedProcessID !== undefined && [<IngredientList 
						products={products} 
						processes={processes} 
						ingredients={this.state.ingredients}
						onChange={this.handleChangeIngredient}
						onRemove={this.handleRemoveIngredient}
						shouldHighlightEmpty={this.state.hasError}
						selectedProcess={processes.find(e => e.id === selectedProcessID)}
						selectedProduct={product}
						key={COMPONENT_PREFIX + '1'}
					/>,
					<div className="add-ingredient-button-container" key={COMPONENT_PREFIX + '2'}>
						<Button type="dashed" onClick={this.handleAddIngredient}>
							<div className="add-ingredient-button">
								<i className="material-icons">add</i>
								<span>Add an ingredient</span>
							</div>
						</Button>
					</div>
				]}
				<Button isLoading={ui.isCreatingItem} onClick={this.handleSubmit}>Save this recipe</Button>
    	</ElementCard>
    )
  }

  getDisabledProcesses() {
  	const { processes, recipes } = this.props
  	let disabledProcesses = {}
		processes.forEach(e => {
			let recipe = recipes.find(r => r.process_type.id === e.id)
			if (recipe) {
				disabledProcesses[e.id] = true
			}
		})
		return disabledProcesses
  }
  
  handleSubmit() {
  	const { selectedProcessID, instructions, ingredients } = this.state
		const { ui, product } = this.props
  	if (ui.isCreatingItem) {
  		return
		}
		if (!validateData(this.state)) {
			this.setState({ hasError: true })
			console.log("validation failed")
			return
		}
		// otherwise, submit and close the box
    const newRecipe = {
		  	instructions: instructions.length > 0 ? instructions : null,
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
			$push: [{product_type: undefined, process_type: undefined, amount: '0'}]
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
	if (!data.selectedProcessID) {
		return false
	}

	let isValid = true
	data.ingredients.forEach((ingredient, i) => {
		if (!ingredient.process_type || !ingredient.product_type) {
			isValid = false
		}
		if(!parseFloat(ingredient.amount)) {
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