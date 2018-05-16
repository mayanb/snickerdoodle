import React from 'react'
import './styles/goalbar.css'
import {formatAmount} from '../../utilities/stringutils'

export default function GoalBar(props) {
	let { achieved, proportion } = getDisplayProportions(props.goal)
	
	return (
		<div className="goal-bar-wrapper">
			<div className="goal-interval">{props.goalInterval}</div>
			<div className={"goal-whole-bar " + (achieved?"goal-achieved":"")}>
				<div className="goal-filled-bar" style={{flex: !achieved?(proportion + '%'):"100%",  borderRadius: achieved?"4px":"4px 0 0 4px"}}>
				</div>
				<div style={{flex: achieved?"0%":((100 - proportion) + '%')}}>
				</div>
			</div>
			<div className="goal-bar-tooltip">{getHoverText(props.goal)}</div>
		</div>
	)
}

function getHoverText(goal) {
	return (
		<div className="goal-details-right goal-buttons">
          <span className="blue">
            {ifNaNSetToZero(goal.actual)}
          </span>
			<span>
            {`/${formatAmount(Math.round(goal.goal), goal.process_unit)}`}
          </span>
		</div>
	)
}

function ifNaNSetToZero(num) {
	return (num && !isNaN(num)) ? parseInt(num, 10) : 0
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
	let actual = ifNaNSetToZero(g.actual)
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