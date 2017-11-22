import React from 'react'
import TeamMemberAccount from './TeamMemberAccount'

export default function MemberList(props) {
	if (props.isFetching) {
		return <div>Loading...</div>
	}

	if (!props.members)
		return <div>No members</div>

	return (
		<div className="member-list">
		{
			props.members.map(function (m, i) {
				return <TeamMemberAccount key={i} index={i} member={m} />
			})
		}
		</div>
	)
}