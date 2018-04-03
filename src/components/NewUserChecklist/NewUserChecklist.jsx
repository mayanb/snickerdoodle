import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import {getGreetingTime} from '../../utilities/stringutils'
import ApplicationSectionHeader from '../Application/ApplicationSectionHeader'
import ChecklistItem from './ChecklistItem'
import './styles/newuserchecklist.css'

class NewUserChecklist extends React.Component {
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
		header: 'Download the Polymer iOS app',
		text: 'Your team will use Polymer’s iOS app to record what they are working on. To get the app, visit the Apple app store and search for “polymer app”. Download the app with the Polymer logo.',
		link: '/download',
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

const mapStateToProps = (state/*, props*/) => {
	let {data, ui} = state.users
	if (ui.activeUser && ui.activeUser >= 0 && data[ui.activeUser]) {
		return { user: data[ui.activeUser].user }
	}
	return { user: {}}
}

export default connect(mapStateToProps)(NewUserChecklist)

/*
Processes are the different steps you take to make things in your production facility. Some examples include: Roasting, Winnowing, Melanging, Tempering, and Packaging.
[condition: are there any processes created for this team]
[link: /processes process list page]
Add log fields for your processes

[condition: are there any attributes created for this team]
[link: /processes/1 process page for their first product without any attributes ]
List your products
Products are everything you make or use in your production facility. Products include finished items you sell like bars of chocolate, or raw ingredients like sugar. 
[condition: are there any products created for this team]
[link: /products product list page]
Download the app
Your team will use Polymer’s iOS app to record what they are working on. To get the app, visit the Apple app store and search for “polymer app”. Download the app with the Polymer logo.
[condition: are there any tasks created for this team]
[link: info/help center page on downloading the app]
Create your first task
When a production team member wants to record what they are working on, they’ll create a new task in the Polymer iOS app. You can then see what they are working on in your dashboard. 
[condition: are there any tasks created for this team]
[link: info/help center page on creating a task in the app]
Invite your team members
Invite everyone on your production and management team to use Polymer. Add their name and email, and we’ll send them a link to set up their account. With different users, you’ll have detailed information on what everyone is working on. 
[condition: are there more than 1 users in this team]
[link: account settings]
*/