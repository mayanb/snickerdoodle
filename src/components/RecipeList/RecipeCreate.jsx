import React from 'react'
import { connect } from 'react-redux'
import { Select, Input } from 'antd'
import Button from '../Card/Button'
import ElementCard from '../Element/ElementCard'
import AntDesignFormGroup from '../Inputs/AntDesignFormGroup'
import { postCreateRecipe } from './RecipeActions'
import './styles/recipecreate.css'

const { TextArea } = Input
const Option = Select.Option

class RecipeCreate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isAddingRecipe: false,
      isSubmitting: false,
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
    return (
      <div className='recipe-create'>
				<RecipeListHeader onSubmit={this.handleSubmit} onOpenAddRecipeForm={this.handleOpenAddRecipeForm} onCancel={this.handleCancel} isAddingRecipe={isAddingRecipe} />
        
        {isAddingRecipe && <ElementCard className='recipe create-recipe'>
          <AntDesignFormGroup className='process' label='Process recipe belongs to'>
						<SelectProcess processes={this.props.processes} onChange={this.handleProcessChange}/>
          </AntDesignFormGroup>
          <AntDesignFormGroup className='description' label='Recipe description'>
            <TextArea rows={4} onChange={this.handleDescriptionChange}/>
          </AntDesignFormGroup>
					<Button wide onClick={this.handleSubmit}>Save</Button>
        </ElementCard>}
      </div>
    )
  }
  
  handleSubmit() {
  	const { selectedProcessID, instructions } = this.state
  	if (this.state.isSubmitting || enteredDataIsInvalid(selectedProcessID, instructions)) {
  		return
		}
		this.setState({ isSubmitting: true })
    const newRecipe = {
		  instructions: this.state.instructions,
			product_type: this.props.product,
			process_type: this.state.selectedProcessID,
    }
    this.props.dispatch(postCreateRecipe(newRecipe))
			.then(res => {
				console.log('postRecipe res: ', res)
				this.setState({ isAddingRecipe: false, isSubmitting: false })
			})
  }
  
  handleOpenAddRecipeForm() {
  	this.setState({ isAddingRecipe: true })
	}
	
	handleCancel() {
    this.setState({
			isAddingRecipe: false,
			isSubmitting: false,
			selectedProcessID: null,
			instructions: '',
    })
	}
	
	handleProcessChange(processID) {
		console.log(`process:`, processID)
		this.setState({ selectedProcessID: processID })
	}
	
	handleDescriptionChange(e) {
		console.log(`e.target.value:`, e.target.value)
		this.setState({ instructions: e.target.value})
	}
}

function enteredDataIsInvalid(processID, instructions) {
	return !(processID && instructions)
}

function RecipeListHeader({onOpenAddRecipeForm, onCancel, isAddingRecipe}) {
	let button = isAddingRecipe
		? <Button onClick={onCancel}>Cancel</Button>
		: <Button type='primary' onClick={onOpenAddRecipeForm}>Add recipe</Button>
	
	return (
		<div className='process-attributes-header'>
			<span>Log fields</span>
			{button}
		</div>
	)
}

function filterOption(input, option) {
  return option.props.data.name.toLowerCase().indexOf(input.toLowerCase()) >= 0
}

function SelectProcess({ processes, onChange }) {
  return (
    <Select
      showSearch
      size='large'
      style={{ flex: 1 }}
      placeholder='Select a process'
      optionFilterProp='data'
      onChange={onChange}
      filterOption={filterOption}
    >
    {processes.map(e => {
      return <Option key={e.id} value={e.id} data={e}>{e.code} - {e.name}</Option>
    })}
    </Select>
  )
}

const mapStateToProps = (state /*, props */) => {
  return {
    processes: state.processes.data
  }
}

export default connect(mapStateToProps)(RecipeCreate)