import React from 'react'
import Dialog from '../Card/Dialog'
import Button from '../Card/Button'
import NewFeatureContent from './NewFeatureContent'


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
			<Dialog onToggle={this.handleClose} className='new-features-card'>
				<NewFeatureContent />
				<div style={{display: 'flex', alignItems: 'flex-end', 'justifyContent': 'flex-end'}}>
					<Button secondary onClick={this.handleClose}>Close</Button>
				</div>
			</Dialog>

		)

	}
}
