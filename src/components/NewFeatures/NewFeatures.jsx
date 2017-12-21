import React from 'react'
import Dialog from '../Card/Dialog'
import Button from '../Card/Button'
import NewFeatureContent from './NewFeatureContent'


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
			<Dialog onToggle={this.handleClose} className='new-features-card'>
				<NewFeatureContent />
				<div style={{display: 'flex', alignItems: 'flex-end', 'justifyContent': 'flex-end'}}>
					<Button secondary onClick={this.handleClose}>Close</Button>
				</div>
			</Dialog>
		)
	}
}