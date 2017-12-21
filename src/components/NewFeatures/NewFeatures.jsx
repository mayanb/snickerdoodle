import React from 'react'
import Dialog from '../Card/Dialog'
import Button from '../Card/Button'
import Select from 'react-select'


export default class NewFeatures extends React.Component {
	constructor(props) {
		super(props)
		{console.log("new features dialog")}

		this.state = {
			"isDisplaying": true,
		}

		this.handleClose = this.handleClose.bind(this)
	}

	handleClose() {
		this.setState({isDisplaying: false})
	}


	render() {
		if (!this.state.isDisplaying)
			return null;

		return (
			<Dialog onToggle={this.handleClose} >
				<div className="buttons">
					<Button onClick={this.handleClose}>Close</Button>
				</div>
			</Dialog>
		)
	}
}