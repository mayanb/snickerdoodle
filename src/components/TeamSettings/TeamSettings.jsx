import React from 'react'
import { connect } from 'react-redux'
import * as actions from './MemberActions'
import Button from '../Card/Button'
import CreateTeamMemberDialog from './CreateTeamMemberDialog'
import GoogleConnect from '../GoogleConnect/GoogleConnect'
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
		console.log(data)

		return (
			<div key={1} className="team-members">
				<MemberList members={data} isFetching={ui.isFetchingData}/>
				<span className="add-new-member" onClick={this.handleToggleDialog}>Add a team member</span>
				<CreateTeamMemberDialog 
					isOpen={this.state.isCreatingMember} 
					onSubmit={this.handleCreateMemberSubmit}
					onCancel={this.handleToggleDialog}
				/>
			</div>
		)
	}
}

function MemberList(props) {
	if (props.isFetching) {
		return <div>Loading...</div>
	}

	if (!props.members)
		return <div>No members</div>

	return (
		<div className="member-list">
		{
			props.members.map(function (m, i) {
				return <Member key={i} member={m} />
			})
		}
		</div>
	)
}

function Member(props) {
	return (
	<div className="member">
		<span>{props.member.username_display}</span>
		<span>{props.member.account_type=="a"?"admin":"regular"}</span>
	</div>
	)
}

const mapStateToProps = (state/*, props*/) => {
  return {
  	users: state.users,
  	members: state.members,
  }
}


const connectedTeamSettings = connect(mapStateToProps)(TeamSettings)

export default connectedTeamSettings
