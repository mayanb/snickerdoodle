import React from 'react'
import Dialog from '../Card/Dialog'
import Button from '../Card/Button'
import DialogHeader from '../Dialog/DialogHeader'
import DialogFooter from '../Dialog/DialogFooter'

let editor_wrapper_style = { display: "flex", marginBottom: "16px"}
let span_style = { display: "block", flex: 3, lineHeight: "28px" }
let input_style = { flex: 5 }
let input_input_style = {width: "100%"}
let footer_style = {display: 'flex', justifyContent: 'flex-end'}
let invalid_style = {color: 'red'}

export default class AccountDetailsEdit extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			value: props.initialValue || "", 
			valid: true
		}
	}

	renderValidation() {
		if (this.state.valid) 
			return 
		return <span style={invalid_style}>Please enter a valid email address.</span>
	}

	render() {
		let props = this.props
		let display = props.keyDisplay.toLowerCase()
		return (
			<Dialog onToggle={props.onCancel}>
				<DialogHeader>{`Change ${display}`}</DialogHeader>
				<div style={editor_wrapper_style}>
					<span style={span_style}>{`New ${display}`}</span>
					<div style={input_style}>
						<input style={input_input_style} 
							placeholder="john@smith.com" 
							value={this.state.value} 
							onChange={(e) => this.setState({value: e.target.value})} 
						/>
						{ this.renderValidation() }
					</div>
				</div>
				<DialogFooter>
					<div style={footer_style}>
						<Button secondary onClick={props.onCancel}>Cancel</Button>
						<Button onClick={this.onSubmit.bind(this)}>Save</Button>
					</div>
				</DialogFooter>
			</Dialog>
		)
	}

	onSubmit() {
		let callback = () => {
			if (this.state.valid)
				this.props.onSubmit(this.state.value)
		}

		this.setState({valid: this.validate()}, callback)
	}

	validate() {
		if (this.props.keyword === 'email') {
			return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.value) 
		}
		return true
	}
}