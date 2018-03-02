import React from 'react'
import {connect} from 'react-redux'
import Dialog from '../Card/Dialog'
import Button from '../Card/Button'

class ProcessAttributeDeleteDialog extends React.Component {
	render() {

		return (
			<Dialog onToggle={this.props.onToggle} onDelete={this.props.onDelete}>
				<h1>Delete attribute</h1>
				<span>Are you sure you want to delete attribute <b>{this.props.attrName}</b>?</span>
				{ this.renderRule() }
				{ this.renderButtons() }
			</Dialog>
		)
	}

	renderRule() {
		return (
			<div className="rule" style={{marginLeft: "-32px", marginRight: "-20px", width: "120%"}} />
		)
	}


	renderButtons() {
		return (
			<div className="create-process-buttons">
				<Button secondary onClick={this.props.onToggle}>Cancel</Button>
				<Button onClick={this.props.onDelete}>Delete</Button>
			</div>
		)
	}

}

const mapStateToProps = (state/*, props*/) => {
  return {
  	data: state.data
  }
}

const connectedProcessAttributeDeleteDialog = connect(mapStateToProps)(ProcessAttributeDeleteDialog)
export default connectedProcessAttributeDeleteDialog
