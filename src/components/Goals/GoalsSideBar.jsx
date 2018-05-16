import React from 'react'
import { connect } from 'react-redux'
import Loading from '../OldComponents/Loading.jsx'
import Goal from './Goal'
import './styles/goalssidebar.css'
import * as actions from "./GoalsActions";

class GoalsSideBar extends React.Component {
	constructor(props) {
		super(props)
	}
	
	componentDidMount() {
		let {users} = this.props
		let user = users.data[users.ui.activeUser].user
		this.props.dispatch(actions.fetchGoals(user.profile_id))
	}
	
	render() {
		const { weeklyGoals } = this.props
		if (!weeklyGoals)
			return <Loading/>
		if (weeklyGoals.ui.isFetchingData)
			return <Loading/>
		console.log(weeklyGoals)
		return (
			<div className='goals-side-bar'>
				{weeklyGoals.data && weeklyGoals.data.map((goal, i) =>
					<Goal
						key={i}
						goal={goal}
						onDelete={goal.onDelete}
					/>
				)}
			</div>
		)
	}
}

const mapStateToProps = (state, props) => {
	return {
		weeklyGoals: state.weeklyGoals,
		monthlyGoals: state.monthlyGoals,
		users: state.users,
	}
}

const connectedGoalsSideBar = connect(mapStateToProps)(GoalsSideBar)

export default connectedGoalsSideBar
