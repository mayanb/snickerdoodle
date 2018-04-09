import React from 'react'
import './styles/taskform.css'
import Input from '../Inputs/Input'

export default class TaskForm extends React.Component {
	render() {
		const { taskAttributes, onSave } = this.props
		return (
			<div className="task-form">
				{taskAttributes.map(a =>
					<AttributeField taskAttribute={a} key={a.id} onSave={onSave} />
				)}
			</div>
		)
	}
}

class AttributeField extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			saving: false,
		}

		this.handleSave = this.handleSave.bind(this)
	}

	handleSave(value) {
		this.setState({ saving: true })
		this.props.onSave(this.props.taskAttribute.id, value)
			.finally(() => this.setState({ saving: false }))
	}


	render() {
		const { taskAttribute } = this.props
		return (
			<div className="attribute-field">
				<div className="form-label">
					{taskAttribute.name}
				</div>
				{this.renderInput()}
			</div>
		)
	}

	renderInput() {
		if (this.state.saving)
			return (
				<div className="loading">Loading...</div>
			)

		return (
			<TextAttribute value={this.props.taskAttribute.value} onSave={this.handleSave} />
		)
	}

}

class TextAttribute extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			draftValue: props.value,
		}
		this.handleInputChange = this.handleInputChange.bind(this)
		this.handleSave = this.handleSave.bind(this)
		this.handleReset = this.handleReset.bind(this)
	}

	handleInputChange(e) {
		this.setState({ draftValue: e.target.value })
	}

	handleReset() {
		this.setState({ draftValue: this.props.value })
	}

	handleSave(e) {
		this.props.onSave(this.state.draftValue)
	}

	render() {
		const { draftValue } = this.state
		return (
			<div className="input-container">
				<Input
					value={draftValue}
					onChange={this.handleInputChange}
				/>
				{this.renderButtons()}
			</div>
		)
	}

	renderButtons() {
		return (
			<div className="form-buttons">
				{/**Rather than onClick, use onMouseDown since it is called before the blur event which hides the buttons*/}
				<div className="form-button reset" onMouseDown={this.handleReset}>
					<i className="material-icons">clear</i>
				</div>
				<div className="form-button save" onMouseDown={this.handleSave}>
					<i className="material-icons">done</i>
				</div>
			</div>
		)
	}
}
