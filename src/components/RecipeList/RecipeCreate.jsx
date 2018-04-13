import React from 'react'
import { connect } from 'react-redux'
import { Select, Input } from 'antd'
import ElementCard from '../Element/ElementCard'
import AntDesignFormGroup from '../Inputs/AntDesignFormGroup'
import './styles/recipecreate.css'

const { TextArea } = Input

const Option = Select.Option
class RecipeCreate extends React.Component {
  render() {
    return (
      <div className='recipe-create'>
        <ElementCard className="recipe create-recipe">
          <AntDesignFormGroup className='process' label='Process recipe belongs to'>
						<SelectProcess processes={this.props.processes} />
          </AntDesignFormGroup>
          <AntDesignFormGroup className='description' label='Recipe description'>
            <TextArea rows={4} />
          </AntDesignFormGroup>
        </ElementCard>
      </div>
    )
  }
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