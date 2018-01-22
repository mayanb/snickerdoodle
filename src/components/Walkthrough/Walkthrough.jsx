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
	WalkthroughCreateUser,
	WalkthroughProcessesAndProducts,
	WalkthroughCreateProcess,
	WalkthroughExampleApp,
	WalkthroughCreateProduct,
	WalkthroughTrain
]

class Walkthrough extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			stageNumber: this.props.user.walkthrough,
		}
	}

	render() {
		if (isNaN(this.state.stageNumber) || this.state.stageNumber < 0 || this.state.stageNumber > stages.length) {
			// there is an error
			return <div />
		}
		const Stage = stages[this.state.stageNumber]
		return (
			<div className="walkthrough">
				<Img src='logo-blue'/>
				<Stage onCompleteStage={this.handleCompleteStage.bind(this)} />
			</div>
		)
	}

	handleCompleteStage() {
		if (this.state.stageNumber === (stages.length - 1)) {
			this.props.dispatch(actions.completeWalkthrough(this.props.user))
			this.props.history.push('/')
		} else {
			this.props.dispatch(actions.incrementWalkthrough(this.props.user))

			//Should remove and depend on API data
			this.setState({ stageNumber: this.state.stageNumber + 1 })
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