import React from 'react'
import { connect } from 'react-redux'
import Goals from '../Goals/Goals'
import ProductionTrends from '../ProductionTrends/ProductionTrends'
import GoalsSideBar from '../Goals/GoalsSideBar'
import './styles/home.css'
import { shouldShowChecklist } from '../../utilities/userutils'
import Checklist from '../NewUserChecklist/NewUserChecklist'


class Home extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			tabs: ['Production trends', 'Goals'],
			activeTab: 0,
		}

		this.handleTab = this.handleTab.bind(this)
	}

	handleTab(i) {
		this.setState({activeTab: i})
	}

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
	let { data, ui } = state.users
	let team = data[ui.activeUser].user.team_name
  return {
    team: team,
  }
}
export default connect(mapStateToProps)(Home)
