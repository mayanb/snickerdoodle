import React from 'react'
import Spinner from 'react-spinkit'
import './styles/taskform.css'
import Input from '../Inputs/Input'
import Switch from '../Switch/Switch'

const TIME_TO_STAY_UNSAVED = 500
const TIME_TO_LOAD = 1000
const TIME_TO_SHOW_SAVED = 1500

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
		return this.props.onSave(this.props.taskAttribute.id, value)
			.then(() => window.setTimeout(() => this.setState({ saving: false }), TIME_TO_LOAD))
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
		let word = e.target.value
		this.setState({ draftValue: word})
		window.setTimeout(() => {
			if(word === this.state.draftValue &&
				word !== this.props.value) {
				this.handleSaveWrapper(word)
			}
		}, TIME_TO_STAY_UNSAVED)
	}

	handleReset() {
		this.setState({ draftValue: this.props.value })
	}

	handleSave() {
		if (this.state.draftValue === this.props.value) {
			return 
		}
		this.handleSaveWrapper(this.state.draftValue)
	}

	handleSaveWrapper(value) {
		this.props.onSave(value)
			.then(() => {
				this.setState({ justSaved: true }, () => {
					window.setTimeout(() => this.setState({ justSaved: false }), TIME_TO_LOAD + TIME_TO_SHOW_SAVED)
				})
			})
	}

	render() {
		const { draftValue } = this.state
		return (
			<div className="input-container">
				<Input
					value={draftValue}
					onChange={this.handleInputChange}
				/>
				<div className="input-peripherals">
				{this.renderButtons()}
				</div>
			</div>
		)
	}

	renderButtons() {
		if (this.props.isLoading) {
			return <Loading />
		} else if(this.state.justSaved) {
			return <div>Saved!</div>
		}else return false
	}
}

function Loading(props) {
	return <div className="task-attr-loading"><Spinner fadeIn="quarter" name="circle" color="#7AD69B"/></div>
}
