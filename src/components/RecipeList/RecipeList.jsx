import React from 'react'
import { connect } from 'react-redux'
import CollapsedRecipe from './CollapsedRecipe'
import Sortable from '../Sortable/Container'
import * as actions from '../Processes/ProcessesActions'
import RecipeCreate from './RecipeCreate'
import { data } from './mockdata'
import './styles/recipelist.css'

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
				<RecipeCreate product={this.props.product}/>
				<div className="product-recipe-list-header">
					<span>Stage</span>
					<span>Ingredients</span>
					<span>Recipe Yield</span>
				</div>
				<Sortable
					cards={recipes}
					canEdit={false}
					renderer={CollapsedRecipe}
				/>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
  return {
    processes: state.processes.data
  }
}

export default connect(mapStateToProps)(RecipeList)
