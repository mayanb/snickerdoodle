import React from 'react'
import Button from '../Card/Button'


/* Usage:
 * <TaskAttribute 
 *    name={ATTRIBUTE_NAME}
 *    value={ATTRIBUTE_VALUE}
 *    isEditing={ATTRIBUTE_S_EDITING}
 *    isEditable={ATTRIBUTE_IS_EDITABLE}
 *    cancelEditing={CANCEL_EDITING_FUNC}  // params: n/a
 *    saveEditing={SAVE_EDIT_FUNC}         // params: newValue, success, failure
 *    startEditing={START_EDITING_FUNC}    // params: n/a
 * />
 */

export default function TaskAttribute(props) {
	if (props.isEditing) {
		return <TaskAttributeEditor {...props} />
	} 
	return BasicTaskAttribute(props)
}

class TaskAttributeEditor extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			value: ""
		}

		this.handleEdit = this.handleEdit.bind(this)
	}

	componentDidMount() {
		this.input.focus()
		let e = {target: {value: this.props.value}}
		this.handleEdit(e)
	}

	handleEdit(e) {
		this.setState({value: e.target.value})
	}

	render() {
		return (
			<div className="task-attribute editor">

				<div className="attribute-content">
					<div className="task-attribute-name">
						<span>{this.props.name}</span>
					</div>
					<div className="task-attribute-value">
						<input 
							value={this.state.value} 
							onChange={this.handleEdit}
							ref={(input) => {this.input = input}}
						/>
					</div>
					{editButton(this.props)}
				</div>

				<div className="attribute-buttons">
					<Button secondary onClick={this.props.finishEditing}>Cancel</Button>
					<Button onClick={() => this.props.saveEditing(this.state.value)}>Save</Button>
				</div>

			</div>
		)
	}
}

function BasicTaskAttribute(props) {
	let isEmpty = (!props.value || props.value.length === 0)
	return (
		<div className="task-attribute attribute-content">
			<div className="task-attribute-name">
				<span>{props.name}</span>
			</div>
			<div className={"task-attribute-value " + (isEmpty?"empty":"")}>
				<span>{isEmpty?"n/a":props.value}</span>
			</div>
			{editButton(props)}
		</div>
	)
}

function editButton(props) {
	if (!props.isEditable) 
		return (null);

	return (
		<div className="task-attribute-edit-button" onClick={props.startEditing}>
			<span>
				<i className="material-icons">mode_edit</i>
			</span>
		</div>
	)
}
