import React from 'react'
import Spinner from 'react-spinkit'
import './styles/taskform.css'
import Input from '../Inputs/Input'
import Switch from '../Switch/Switch'

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
			.finally(() => window.setTimeout(() => this.setState({ saving: false }), 2000))
	}


	render() {
		const { taskAttribute } = this.props
		return (
			<div className="attribute-field">
				<div className="form-label">
					{taskAttribute.name}
				</div>
				{this.renderValue()}
			</div>
		)
	}

	renderValue() {
		const { taskAttribute } = this.props
		return taskAttribute.datatype === 'BOOL' ?
			<BooleanAttribute 
				value={taskAttribute.value} 
				onSave={this.handleSave} 
				isLoading={this.state.saving}
			/> :
			<TextAttribute 
				value={taskAttribute.value} 
				onSave={this.handleSave} 
				isLoading={this.state.saving}
			/>
	}
}

class BooleanAttribute extends React.Component {
	constructor(props) {
		super(props)
		this.handleChange = this.handleChange.bind(this)
	}

	handleChange(val) {
		//Set new value to opposite of existing value
		const newValue = this.props.value ? '' : 'true'
		this.props.onSave(newValue)
	}

	render() {
		let { value, isLoading } = this.props
		const boolValue = value === 'true'
		const stringValue = boolValue ? 'Yes' : 'No'
		return (
			<div className="boolean-container">
				{stringValue}
				<Switch
					value={boolValue}
					onClick={this.handleChange}
				/>
				{ isLoading && <Loading /> }
			</div>
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
		if (this.props.isLoading) {
			return <Loading />
		}

	 // Rather than onClick, use onMouseDown since it is called before the blur event which hides the buttons
		return (
			<div className="form-buttons">
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

function Loading(props) {
	return <div className="task-attr-loading"><Spinner fadeIn="quarter" name="circle" color="#7AD69B"/></div>
}
