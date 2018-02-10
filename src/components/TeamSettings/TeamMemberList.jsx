import React from 'react'
import TeamMemberAccount from './TeamMemberAccount'
import {isAdmin, isRegular} from '../../authentication/authentication'

export default function MemberList(props) {
	if (props.isFetching) {
		return <div>Loading...</div>
	}

	if (!props.members)
		return <div>No members</div>

	let n = numAdmins(props.members)


	return (
		<div className="member-list">
		{
			props.members.map(function (m, i) {
				return <TeamMemberAccount key={i} index={i} member={m} editable={props.editable && shouldAllowEdit(m, n)}/>
			})
		}
		</div>
	)
}

function numAdmins(members) {
	let adminCount = 0
	members.forEach(function (m, i) {
		if (isAdmin(m))
			adminCount++
	})
	return adminCount
}

function shouldAllowEdit(member, n) {
	return n > 1 || isRegular(member)
}