import React from 'react'
import {connect} from 'react-redux'
import * as actions from './ProductFormulaActions'

class StartAddingFormula extends React.Component {
	render() {
		return (
			<div className="recipe-formula start-adding-formula" onClick={this.handleClick.bind(this)}>
				<i className="material-icons">add_circle_outline</i>
				<span>Add a formula</span>
			</div>
		)
	}

	handleClick(e) {
		this.props.dispatch(actions.startAddingFormula(this.props.process_type))
	}
}

const mapStateToProps = (state/*, props*/) => {
  return {}
}

export default connect(mapStateToProps)(StartAddingFormula)