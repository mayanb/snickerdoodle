import React from 'react'
import Icon from '../Card/Icon'
import {isAdmin} from '../../authentication/authentication'
import TeamMemberChangeAccountType from './TeamMemberChangeAccountType'

export default function Member(props) {
	return (
	<div className="member">
		<Icon content={props.member.first_name}/>
		<div className="account-names">
			<span className="account-name-real">{`${props.member.first_name} ${props.member.last_name}`}</span>
			<span>{getUsernameOrPending(props.member)}</span>
		</div>
		<div className="account-types">
		{ 
			props.editable ? <TeamMemberChangeAccountType {...props} /> : 
				<span style={{marginRight: '8px'}}>
					{isAdmin(props.member)?"Administrator":"Regular"} 
				</span>
		}
		</div>
	</div>
	)
}

function getUsernameOrPending(user) {
	if (user.username_display.includes('-'))
		return <span style={{opacity: "0.5"}}>Pending</span>
	else return user.username_display.toLowerCase()
}