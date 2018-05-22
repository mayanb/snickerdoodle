import React from 'react'
import { connect } from 'react-redux'
import ProductionTrends from '../ProductionTrends/ProductionTrends'
import GoalsSideBar from '../Goals/GoalsSideBar'
import './styles/home.css'
import { shouldShowChecklist } from '../../utilities/userutils'
import Checklist from '../NewUserChecklist/NewUserChecklist'

class Home extends React.Component {
	render() {
		if (shouldShowChecklist(this.props.team.toLowerCase())) {
			return <Checklist />
		}
		
		return (
			<div className="dashboard">
				<ProductionTrends />
				<GoalsSideBar/>
			</div>
		)
	}
}

const mapStateToProps = (state/*, props*/) => {
	const { data, ui } = state.users
  return {
    team: data[ui.activeUser].user.team_name,
  }
}

export default connect(mapStateToProps)(Home)
