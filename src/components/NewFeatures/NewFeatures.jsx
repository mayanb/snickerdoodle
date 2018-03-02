import React from 'react'
import Dialog from '../Card/Dialog'
import Button from '../Card/Button'
import NewFeatureContent from './NewFeatureContent'


export default class NewFeatures extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			"isDisplaying": !window.localStorage.getItem("newfeatures2"),
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
				<div style={{display: 'flex', alignItems: 'flex-end', 'justifyContent': 'center', marginTop: '24px'}}>
					<Button link onClick={this.handleClose}>Close</Button>
				</div>
			</Dialog>

		)

	}
}
