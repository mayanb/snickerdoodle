import React from 'react'
import {connect} from 'react-redux'
import WalkthroughCreateUser from './WalkthroughCreateUser'
import WalkthroughCoreConcepts from './WalkthroughCoreConcepts'
import './styles/walkthrough.css'

let sections = [
	<WalkthroughCreateUser />,
]

class Walkthrough extends React.Component {
	render() {
		return <div className="walkthrough"><WalkthroughCreateUser /></div>




		let section = this.props.user.walkthrough_progress
		if (section < 0 || section > sections.length) {
			// there is an error
			return <div />
		} else if (section == sections.length) {
			// user has finished the walkthrough
			return <div />
		}

		return (
			<div>
				{ sections[section] }
			</div>
		)
	}
}

const mapStateToProps = (state/*, props*/) => {
	let {data, ui} = state.users
	if (ui.activeUser && ui.activeUser >= 0 && ui.activeUser < data.length) {
		let account = data[ui.activeUser]
  	return { user: account.user }
  }
  return { user: {}}
}

export default connect(mapStateToProps)(Walkthrough)