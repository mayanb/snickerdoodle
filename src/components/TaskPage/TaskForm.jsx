import React from 'react'
import './styles/taskform.css'
import Input from '../Inputs/Input'

export default class TaskForm extends React.Component {
	render() {
		const { taskAttributes } = this.props
		return (
			<div className="task-form">
				{taskAttributes.map(a =>
					<AttributeField taskAttribute={a} key={a.id} onSave={this.props.onSave}/>
				)}
			</div>
		)
	}
}

class AttributeField extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			draftValue: props.taskAttribute.value
		}

		this.handleSave = this.handleSave.bind(this)
		this.handleReset = this.handleReset.bind(this)
		this.handleInputChange = this.handleInputChange.bind(this)
	}

	handleReset(e) {
		this.setState({ draftValue: this.props.taskAttribute.value })
	}

	handleSave(e) {
		this.onSave(this.state.draftValue)
	}

	handleInputChange(e) {
		this.setState({ draftValue: e.target.value })
	}

	render() {
		const { taskAttribute } = this.props
		const { draftValue } = this.state
		return (
			<div className="attribute-field">
				<div className="form-label">
					{taskAttribute.name}
				</div>
				<div className="input-container">
					<Input
						value={draftValue}
						onChange={this.handleInputChange}
					/>
					<div className="form-button reset" onClick={this.handleReset}>
						<i className="material-icons">clear</i>
					</div>
					<div className="form-button save" onClick={this.handleSave}>
						<i className="material-icons">done</i>
					</div>
				</div>
			</div>
		)
	}
}
