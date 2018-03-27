import React from 'react'
import Goal from "./Goal"
import Sortable from '../Sortable/Container'


export default function GoalsByUsername(props) {
	return (
		<div>
            <Sortable
				cards={props.goals}
                // cards={[]}
                canEdit={true}
                // finishMovingCard={this.moveGoal.bind(this)}
                renderer={Goal}
            />
		</div>
	)
}