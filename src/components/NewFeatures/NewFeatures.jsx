import React from 'react'
import Dialog from '../Card/Dialog'
import Button from '../Card/Button'
import NewFeatureContent from './NewFeatureContent'
import { withRouter } from 'react-router'

const FEATURE_VERSION = 'newfeatures2-1'
const FEATURE_PATHNAME = '/inventory'

class NewFeatures extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			"isDisplaying": !window.localStorage.getItem(FEATURE_VERSION),
		}

		this.handleClose = this.handleClose.bind(this)
	}

	handleClose() {
		this.setState({isDisplaying: false})
		window.localStorage.setItem(FEATURE_VERSION, true)
	}

	render() {
		if (!this.state.isDisplaying || !(this.props.location.pathname === FEATURE_PATHNAME))
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

export default withRouter(NewFeatures)
