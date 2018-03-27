import React from 'react'
import Goal from "./Goal"
import Sortable from '../Sortable/Container'
import Card from '../Card/Card'
import './styles/goals-by-username.css'

export default function GoalsByUsername(props) {
	return (
		<div className="goals-by-username">
			<GoalsByUsernameHeader index={props.index} username={props.username}/>
			{props.goals.map((goal, i) => <Goal key={i} goal={goal}/>)}
		</div>
	)
}

function GoalsByUsernameHeader(props) {
    return (
        <span className={'header' + (props.index === 0 ? ' first' : '')}>
			Goals created by <span className="bold">{props.username}</span>
		</span>
    )
}

