import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'antd'
import CollapsedRecipe from './CollapsedRecipe'
import Sortable from '../Sortable/Container'
import * as actions from '../Processes/ProcessesActions'
import RecipeCreate from './RecipeCreate'

import { data } from './mockdata'
import './styles/product-recipe-list.css'

class RecipeList extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			data: data,
		}
	}

	componentDidMount() {
    this.props.dispatch(actions.fetchProcesses())
  }
	
	render() {
		const { recipes } = this.state.data
		
		return (
			<div className="product-recipe-list">
				<ProcessAttributesHeader />
				<RecipeCreate />
				<Sortable
					cards={recipes}
					canEdit={false}
					renderer={CollapsedRecipe}
				/>
			</div>
		)
	}
}

function ProcessAttributesHeader({onAdd, onCancel, isAdding}) {
	let button = isAdding 
		? <Button onClick={onCancel}>Cancel</Button>
		: <Button type="primary" onClick={onAdd}>Add a field</Button>

	return (
		<div className="process-attributes-header">
			<span>Log fields</span>
			{button}
		</div>
	)
}

const mapStateToProps = (state /*, props */) => {
  return {
    processes: state.processes.data
  }
}

export default connect(mapStateToProps)(RecipeList)
