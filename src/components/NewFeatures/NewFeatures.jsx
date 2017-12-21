import React from 'react'
import Dialog from '../Card/Dialog'
import Button from '../Card/Button'
import Select from 'react-select'


export default class NewFeatures extends React.Component {
	constructor(props) {
		super(props)
		{console.log("new features dialog")}
		console.log(window.localStorage.getItem("newfeatures1"))
		this.state = {
			"isDisplaying": !window.localStorage.getItem("newfeatures1"),
		}

		this.handleClose = this.handleClose.bind(this)
	}

	handleClose() {
		this.setState({isDisplaying: false})
		window.localStorage.setItem("newfeatures1", true)

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
