import React from 'react'
import { connect } from 'react-redux'
import { Input } from 'antd'
import Button from '../Card/Button'
import ElementCard from '../Element/ElementCard'
import AntDesignFormGroup from '../Inputs/AntDesignFormGroup'
import { postCreateRecipe } from './RecipeActions'
import RecipeCreateHeader from './RecipeCreateHeader'
import ProcessDropdown from './ProcessDropdown'
import './styles/recipecreate.css'

class RecipeCreate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isAddingRecipe: false,
      selectedProcessID: null,
      instructions: '',
    }
    
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleOpenAddRecipeForm = this.handleOpenAddRecipeForm.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
		this.handleProcessChange = this.handleProcessChange.bind(this)
		this.handleDescriptionChange = this.handleDescriptionChange.bind(this)
  }
  
  render() {
    const { isAddingRecipe } = this.state
		const { TextArea } = Input
	
		return (
      <div className='recipe-create'>
				<RecipeCreateHeader onSubmit={this.handleSubmit} onOpenAddRecipeForm={this.handleOpenAddRecipeForm} onCancel={this.handleCancel} isAddingRecipe={isAddingRecipe} />
        
        {isAddingRecipe && <ElementCard className='recipe create-recipe'>
          <AntDesignFormGroup className='process' label='Process recipe belongs to'>
						<ProcessDropdown processes={this.props.processes} onChange={this.handleProcessChange}/>
          </AntDesignFormGroup>
          <AntDesignFormGroup className='description' label='Recipe description'>
            <TextArea rows={4} onChange={this.handleDescriptionChange}/>
          </AntDesignFormGroup>
					<Button onClick={this.handleSubmit}>Save</Button>
        </ElementCard>}
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
				console.log('recipe create res:', res)
				this.setState({ isAddingRecipe: false })
			})
  }
  
  handleOpenAddRecipeForm() {
  	this.setState({ isAddingRecipe: true })
	}
	
	handleCancel() {
    this.setState({
			isAddingRecipe: false,
			selectedProcessID: null,
			instructions: '',
    })
	}
	
	handleProcessChange(processID) {
		this.setState({ selectedProcessID: processID })
	}
	
	handleDescriptionChange(e) {
		this.setState({ instructions: e.target.value})
	}
}

function enteredDataIsInvalid(processID, instructions) {
	return !(processID && instructions)
}

const mapStateToProps = (state) => {
  return {
    processes: state.processes.data,
		ui: state.recipes.ui,
	}
}

export default connect(mapStateToProps)(RecipeCreate)