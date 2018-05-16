import React from 'react'
import './styles/goalbar.css'

export default function GoalBar(props) {
	let {achieved, proportion} = getDisplayProportions(props.goal.goal)
	
	return (
		<div className="goal-bar-wrapper">
      <div className="goal-interval">{props.goalInterval}</div>
			<div className={"goal-whole-bar " + (achieved?"goal-achieved":"")}>
				<div className="goal-filled-bar" style={{flex: !achieved?(proportion + '%'):"100%",  borderRadius: achieved?"4px":"4px 0 0 4px"}}>
				</div>
				<div style={{flex: achieved?"0%":((100 - proportion) + '%')}}>
				</div>
			</div>
		</div>
	)
}

/* getDisplayProportions
 * ---------------------
 * Takes a @goal object and extracts display requirements. 
 * Returns an object with the following fields:
 * @achieved: whether the goal has been met or not
 * @proportion: a ratio between actual and goal, order depends 
 *              on which is smaller, since we have to mark out
 *              the smaller one on a scale of the larger one
 */

function getDisplayProportions(g) {
	let actual = parseFloat(g.actual || 0)
	let goal = parseFloat(g.goal)
	
	if (actual < goal) {
		return {
			achieved: false,
			proportion: (goal ? Math.max(actual/goal * 100, 3) : 100)
		}
	} else {
		return {
			achieved: true,
			proportion: (actual ? Math.max(goal/actual * 100, 3) : 100)
		}
	}
}