import React from 'react'
import { connect } from 'react-redux'
import { HIDE_MODAL_TYPE } from '../../reducers/ModalReducer'
import { MODAL } from '../../reducers/ReducerTypes'
import TaskDialogSimple from './TaskDialogSimple'

class TaskDialog extends React.Component {
	constructor(props) {
		super(props)
		this.hideTaskDialog = this.hideTaskDialog.bind(this)
	}

	render() {
		return (
			<TaskDialogSimple 
				header={this.props.header || 'Tasks'}
				onToggle={this.hideTaskDialog} 
				tasks={this.props.tasks}
			/>
		)
	}

	hideTaskDialog() {
		this.props.dispatch({
			name: MODAL,
			type: HIDE_MODAL_TYPE,
		})
	}
}

export default connect(() => {})(TaskDialog)
