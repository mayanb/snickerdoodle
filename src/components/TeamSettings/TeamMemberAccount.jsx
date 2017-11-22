import React from 'react'
import Icon from '../Card/Icon'
import {colorHash} from '../Logic/stringutils'
import TeamMemberChangeAccountType from './TeamMemberChangeAccountType'

export default function Member(props) {
	return (
	<div className="member">
		<Icon content={props.member.username_display}/>
		<div className="account-names">
			<span className="account-name-real">{`${props.member.first_name} ${props.member.last_name}`}</span>
			<span>{props.member.username_display.toLowerCase()}</span>
		</div>
		<div className="account-types">
			<TeamMemberChangeAccountType {...props} />
		</div>
	</div>
	)
}
