import React from 'react'
import { connect } from 'react-redux'
import { Select, Input, Button } from 'antd'
import ElementCard from '../Element/ElementCard'
import AntDesignFormGroup from '../Inputs/AntDesignFormGroup'
import './styles/recipecreate.css'

const { TextArea } = Input
const Option = Select.Option

class RecipeCreate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isAddingRecipe: true, // TEMPORARY, FOR DEV EASE
      selectedProcess: null,
      descriptionText: '',
    }
    
    this.onAddRecipe = this.onAddRecipe.bind(this)
    this.onCancel = this.onCancel.bind(this)
  }
  
  render() {
    const { isAddingRecipe } = this.state
    return (
      <div className='recipe-create'>
				<ProcessAttributesHeader onAdd={this.onAddRecipe} onCancel={this.onCancel} isAddingRecipe={isAddingRecipe} />
        
        {isAddingRecipe && <ElementCard className="recipe create-recipe">
          <AntDesignFormGroup className='process' label='Process recipe belongs to'>
						<SelectProcess processes={this.props.processes} />
          </AntDesignFormGroup>
          <AntDesignFormGroup className='description' label='Recipe description'>
            <TextArea rows={4} />
          </AntDesignFormGroup>
        </ElementCard>}
      </div>
    )
  }
  
  onAddRecipe() {
    console.log('add recipe')
		this.setState({ isAddingRecipe: true })
  }
	
	onCancel() {
		console.log('cancel recipe')
    this.setState({ isAddingRecipe: false })
	}
}

function ProcessAttributesHeader({onAdd, onCancel, isAddingRecipe}) {
	let button = isAddingRecipe
		? <Button onClick={onCancel}>Cancel</Button>
		: <Button type="primary" onClick={onAdd}>Add a recipe for this product</Button>
	
	return (
		<div className="process-attributes-header">
			<span>Log fields</span>
			{button}
		</div>
	)
}

function filterOption(input, option) {
  return option.props.data.name.toLowerCase().indexOf(input.toLowerCase()) >= 0
}

function SelectProcess({ processes }) {
  return (
    <Select
      showSearch
      size="large"
      style={{ flex: 1 }}
      placeholder="Select a process"
      optionFilterProp="data"
      // onChange={this.handleChange}
      // onFocus={this.handleFocus}
      // onBlur={this.handleBlur}
      filterOption={filterOption}
    >
    {processes.map(e => {
      return <Option value={e.id} data={e}>{e.code} - {e.name}</Option>
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