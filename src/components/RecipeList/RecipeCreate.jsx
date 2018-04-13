import React from 'react'
import { connect } from 'react-redux'
import { Input } from 'antd'
import ElementCard from '../Element/ElementCard'
import FormGroup from '../Inputs/FormGroup'
import { RecipeSelect } from './RecipeSelect'
import RecipeIngredient from './RecipeIngredient'

const { TextArea } = Input

class RecipeCreate extends React.Component {
  render() {
    const { processes } = this.props
    return (
      <ElementCard className="recipe create-recipe">
        <FormGroup label="Select a stage">
          <div className="recipe-stage-select">
            <RecipeSelect style={{ flex: 1 }} data={processes} />
          </div>
        </FormGroup>
        <TextArea rows={4} />
        <RecipeIngredient processes={processes}  products={processes} />
      </ElementCard>
    )
  }
}

const mapStateToProps = (state /*, props */) => {
  return {
    processes: state.processes.data
  }
}

export default connect(mapStateToProps)(RecipeCreate)