import React from 'react'
import {connect} from 'react-redux'
import Select from '../Select/Select'

class AddSection extends React.Component {

	render() {
		return (
			<div>
				<span>Add a stage</span>
				<Select />
				<i className="material-icons">add_circle_outline</i>
			</div>
		)	
	}

	handleAdd() {
		// this.props.dispatch(action.addSection())
	}

}


const mapStateToProps = (state/*, props*/) => {
	return {
		processes: state.processes.data
	}
}

export default connect(mapStateToProps)(AddSection)