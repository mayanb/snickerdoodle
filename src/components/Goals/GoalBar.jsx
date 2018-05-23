import React from 'react'
import { Tooltip } from 'antd';
import './styles/goalbar.css'
import { formatAmount } from '../../utilities/stringutils'

export default function GoalBar(props) {
	const { goal } = props
	if (!goal) {
		return null
	}
	const overlayStyle = {
	
	}
	const { achieved, proportion } = getDisplayProportions(goal)
	return (
		<Tooltip title={getHoverTextComponent(goal)} placement="left" overlayStyle={overlayStyle}>
			<div className="goal-bar-wrapper">
				<div className="goal-interval">{goal.timerange === 'w' ? 'week' : 'month'}</div>
				<div className={"goal-whole-bar " + (achieved?"goal-achieved":"")}>
					<div className="goal-filled-bar" style={{flex: !achieved?(proportion + '%'):"100%",  borderRadius: achieved?"4px":"4px 0 0 4px"}}>
					</div>
					<div style={{flex: achieved?"0%":((100 - proportion) + '%')}}>
					</div>
				</div>
			</div>
		</Tooltip>
	)
}

function getHoverTextComponent(goal) {
	return (
		<span className="goal-hover-text">
			<span className="current-progress">
				{ifNaNSetToZero(goal.actual)}
			</span>
			<span className="goal-amount">
				{` / ${formatAmount(Math.round(goal.goal), goal.process_unit).toLowerCase()}`}
			</span>
		</span>
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