import React from 'react'
import {connect} from 'react-redux'
import AccountSectionHeader from './AccountSectionHeader'
import TeamSettings from '../TeamSettings/TeamSettings'

class AccountTeam extends React.Component {
	render() {
		let {data, ui} = this.props.users
		let user = data[ui.activeUser].user
		return (
			<div>
				<AccountSectionHeader title="My Team" />
				<span>{`You are ${user.account_type==="a"?"an admin":"a part"} of the team `}<span style={{fontWeight: "700"}}>{user.team_name}</span>.</span>
				{this.renderTeam()}

			</div>
		)
	}

	renderTeam() {
		return <TeamSettings />
	}

}

const mapStateToProps = (state/*, props*/) => {
  return {
    users: state.users,
  }
}

const connected = connect(mapStateToProps)(AccountTeam)

export default connected

