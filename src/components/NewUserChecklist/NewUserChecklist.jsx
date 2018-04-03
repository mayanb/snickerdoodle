import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import {getGreetingTime} from '../../utilities/stringutils'
import * as actions from './NewUserChecklistActions'
import ApplicationSectionHeader from '../Application/ApplicationSectionHeader'
import ChecklistItem from './ChecklistItem'
import './styles/newuserchecklist.css'

class NewUserChecklist extends React.Component {
	componentDidMount() {
		console.log("fetching")
		this.props.dispatch(actions.fetchTeams())
		this.props.dispatch(actions.fetchTasks())
	}

	render() {
		const checklist_items = this.getChecklistItems()
		return (
			<div className="new-user-checklist-container">
				<ApplicationSectionHeader>Onboard your factory</ApplicationSectionHeader>
				<div className="new-user-checklist">
				<span className="good-morning">Good {getGreetingTime(moment())}, {this.getUsername()}!</span>
				<span className="checklist-help">Have any questions? Visit our <a href=""><i className="material-icons">library_books</i>&nbsp;Help Center.</a></span>
				<span className="checklist-title">Things to do</span>
				{
					checklist_items.map((e, i) => <ChecklistItem {...e} key={i} />)
				}
				</div>
			</div>
		)
	}

	getChecklistItems() {
		data.forEach((e, i) => {
			// e.isDone = calculateIsDone()
		})
		data.sort((a, b) => a.isDone ? 1 : -1)
		return data
	}

	getUsername() {
		return this.props.user.first_name
	}
}

const mapStateToProps = (state/*, props*/) => {
	let {data, ui} = state.users
	let user = {}
	if (ui.activeUser && ui.activeUser >= 0 && data[ui.activeUser]) {
		user = data[ui.activeUser].user
	}

	return {
		teams: state.teams.data,
		teamsUI: state.teams.ui,
		tasks: state.tasks.data,
		tasksUI: state.tasks.data,
		user: user,
	}
}

export default connect(mapStateToProps)(NewUserChecklist)

const data = [
	{
		header: 'List some processes',
		text: 'Processes are the different steps you take to make things in your production facility. Some examples include: Roasting, Winnowing, Melanging, Tempering, and Packaging.',
		link: '/processes',
	}, {
		header: 'Add log fields for your processes',
		text: 'Build your logs by adding the fields you want your production team to fill out. You’ll define log fields for each process; for example, in the “Roasting” process you can add Temperature as log field.',
		link: '/processes',
	}, {
		header: 'List your products',
		text: 'Products are everything you make or use in your production facility. Products include finished items you sell like bars of chocolate, or raw ingredients like sugar. ',
		link: '/products',
	}, {
		header: 'Create your first task',
		text: 'When a production team member wants to record what they are working on, they’ll create a new task in the Polymer iOS app. You can then see what they are working on in your dashboard. ',
		link: '/firsttask',
	}, {
		header: 'Invite your team members',
		text: 'Invite everyone on your production and management team to use Polymer. Add their name and email, and we’ll send them a link to set up their account. With different users, you’ll have detailed information on what everyone is working on. ',
		link: '/account',
	},
]

