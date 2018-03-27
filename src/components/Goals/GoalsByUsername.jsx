import React from 'react'
import Goal from "./Goal"
import Sortable from '../Sortable/Container'
import './styles/goals-by-username.css'

export default function GoalsByUsername(props) {
	return (
		<div className="goals-by-username">
			<GoalsByUsernameHeader index={props.index} username={props.username}/>
            <Sortable
				cards={props.goals}
                canEdit={true}
                // finishMovingCard={this.moveGoal.bind(this)}
                renderer={Goal}
            />
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