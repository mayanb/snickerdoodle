import React from 'react'
import { connect } from 'react-redux'
import * as actions from './MemberActions'
import Button from '../Card/Button'
import CreateTeamMemberDialog from './CreateTeamMemberDialog'
let s = false

class TeamSettings extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			isCreatingMember: false
		}

		this.handleToggleDialog = this.handleToggleDialog.bind(this)
		this.handleCreateMemberSubmit = this.handleCreateMemberSubmit.bind(this)
	}

	componentDidMount() {
		this.props.dispatch(actions.fetchTeamMembers())
	}

	handleToggleDialog() {
		this.setState({isCreatingMember: !this.state.isCreatingMember})
	}

	handleCreateMemberSubmit(data, callback) {
		this.props.dispatch(actions.postCreateMember(data, callback))
	}

	render() {
		let {ui, data} = this.props.members
		let users = this.props.users
		let selectedUser = users.data[users.ui.activeUser].user

		return (
			<div key={1} >
				<TeamHeader name={selectedUser.team_name}/>
				<MemberList members={data} isFetching={ui.isFetchingData}/>
				<Button onClick={this.handleToggleDialog}>Add a team member</Button>
				<CreateTeamMemberDialog 
					isOpen={this.state.isCreatingMember} 
					onSubmit={this.handleCreateMemberSubmit}
					onCancel={this.handleToggleDialog}
				/>
			</div>
		)
	}
}

/* API requirements:
 * for a particular team, get all the current users 
 * create a user given a particular team
 */

function TeamHeader(props) {
	return (
		<h1>{`My team: ${props.name}`}</h1>
	)
}

function MemberList(props) {
	if (props.isFetching) {
		return <div>Loading...</div>
	}

	if (!props.members)
		return <div>No members</div>

	return (
		<ul>
		{
			props.members.map(function (m, i) {
				return <Member key={i} member={m} />
			})
		}
		</ul>
	)
}

function Member(props) {
	return <div>{props.member.username}</div>
}

const mapStateToProps = (state/*, props*/) => {
  return {
  	users: state.users,
  	members: state.members,
  }
}

const connectedTeamSettings = connect(mapStateToProps)(TeamSettings)

export default connectedTeamSettings
