import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import WalkthroughCreateUser from './WalkthroughCreateUser'
import WalkthroughProcessesAndProducts from './WalkthroughProcessesAndProducts'
import WalkthroughCreateProcess from './WalkthroughCreateProcess'
import WalkthroughExampleApp from './WalkthroughExampleApp'
import WalkthroughCreateProduct from './WalkthroughCreateProduct'
import WalkthroughTrain from './WalkthroughTrain'
import './styles/walkthrough.css'
import * as actions from "./WalkthroughActions"
import Img from '../Img/Img'

const stages = [
	<div>Error</div>,
	WalkthroughProcessesAndProducts,
	WalkthroughCreateProcess,
	WalkthroughExampleApp,
	WalkthroughCreateProduct,
	WalkthroughTrain
]

class Walkthrough extends React.Component {
	render() {
		// there is an error or u are not logged in, so redirect to login 
		let stageNumber = this.props.user.walkthrough
		if (isNaN(stageNumber) || stageNumber < 0 || stageNumber > stages.length) {
			this.props.history.push('/login')
			return <div />
		}

		const Stage = stages[stageNumber]
		return (
			<div className="walkthrough">
				<Img src='logo-blue'/>
				<Stage onCompleteStage={this.handleCompleteStage.bind(this)} />
			</div>
		)
	}

	handleCompleteStage() {
		let stageNumber = this.props.user.walkthrough
		if (stageNumber === (stages.length - 1)) {
			this.props.dispatch(actions.completeWalkthrough(this.props.user))
			this.props.history.push('/')
		} else {
			this.props.dispatch(actions.incrementWalkthrough(this.props.user))
		}
	}
}


const mapStateToProps = (state/*, props*/) => {
	let { data, ui } = state.users
	if (ui.activeUser && ui.activeUser >= 0 && data[ui.activeUser]) {
		return { user: data[ui.activeUser].user }
	}
	return { user: {} }
}

export default withRouter(connect(mapStateToProps)(Walkthrough))