import React from 'react'
import { connect } from 'react-redux'
import Goal from './Goal'

class GoalSection extends React.Component {
	render() {
		let {goals, heading, timerange} = this.props
		let sectionGoals = this.getSectionGoals()

		if (sectionGoals.length == 0) {
			return null
		}

		return (
			<div>
				<span className="card-header">{heading}</span>
				{ sectionGoals }
			</div>
		)
	}

	getSectionGoals() {
		let {goals, heading, timerange, handleDelete} = this.props
		let sectionGoals = []
		goals.data.map(function (goal, i) {
			if(goal.timerange == timerange) {
				let g = <Goal goal={goal} key={i} onDelete={() => handleDelete(goal, i)} />
				sectionGoals.push(g)
			}
		}, this)
		return sectionGoals
	}
}

const mapStateToProps = (state/*, props*/) => {
  return {
    goals: state.goals
  }
}

const connected = connect(mapStateToProps)(GoalSection)
export default connected
