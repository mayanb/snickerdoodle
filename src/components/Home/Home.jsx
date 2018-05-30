import React from 'react'
import { connect } from 'react-redux'
import ApplicationSectionHeader from '../Application/ApplicationSectionHeader'
import ProductionTrends from '../ProductionTrends/ProductionTrends'
import GoalsSideBar from '../Goals/GoalsSideBar'
import * as processesActions from '../Processes/ProcessesActions.jsx'
import * as productsActions from '../Products/ProductsActions.jsx'
import * as goalActions from '../Goals/GoalsActions'
import './styles/home.css'
import { shouldShowChecklist } from '../../utilities/userutils'
import Checklist from '../NewUserChecklist/NewUserChecklist'
import { checkEqual } from '../../utilities/arrayutils'
import { GOALS, PINS } from '../../utilities/constants'
import PageSpecificNewFeatureIntro from '../NewFeatures/PageSpecificNewFeatureIntro'


class Home extends React.Component {
	constructor(props) {
		super(props)
		
		this.state = {
			pinsTabIsActive: true,
			isAnnouncementOpen: true, // but will return null if already seen/
		}

		this.setActiveTabTo = this.setActiveTabTo.bind(this)
		this.handleFilterChange = this.handleFilterChange.bind(this)
		this.handleEditGoal = this.handleEditGoal.bind(this)
		this.handleDeleteGoal = this.handleDeleteGoal.bind(this)
		this.setDefaultFilters = this.setDefaultFilters.bind(this)
	}

	componentDidMount() {
		this.props.dispatch(processesActions.fetchProcesses())
		this.props.dispatch(productsActions.fetchProducts())
		this.props.dispatch(goalActions.fetchGoals())
		this.props.dispatch(goalActions.fetchPins())
	}

	setDefaultFilters() {
		const firstPin = this.props.pins[0]
		const defaultProcessType = firstPin ? firstPin.process_type : this.props.processes[0].id
		const { selectedProcess, selectedProducts } = this.getFilters()
		this.handleFilterChange(
			selectedProcess ? selectedProcess : defaultProcessType,
			selectedProducts
		)
	}
	
	setActiveTabTo(tabName) {
		if (tabName === GOALS) {
			this.setState({ pinsTabIsActive: false })
		} else if (tabName === PINS) {
			this.setState({ pinsTabIsActive: true })
		}
	}

	handleFilterChange(selectedProcess, selectedProducts) {
		const qs = new URLSearchParams(this.props.location.search)
		qs.set('selectedProcess', selectedProcess)
		qs.set('selectedProducts', selectedProducts.join(','))
		this.props.history.push({ search: qs.toString() })
	}

	getGoalIndex(goal) {
		return this.props.goals.findIndex((g) => g.id === goal.id)
	}

	handleEditGoal(goal, amount) {
		return this.props.dispatch(goalActions.postEditGoalAmount(goal, amount, this.getGoalIndex(goal)))
	}

	handleDeleteGoal(goal) {
		return this.props.dispatch(goalActions.postDeleteGoal(goal, this.getGoalIndex(goal)))
	}

	getFilters() {
		const qs = new URLSearchParams(this.props.location.search)
		return {
			selectedProcess: qs.get('selectedProcess'),
			selectedProducts: qs.get('selectedProducts') ? qs.get('selectedProducts').split(',') : []
		}
	}

	filteredGoals() {
		const { selectedProcess, selectedProducts } = this.getFilters()
		return this.props.goals.filter(goal => {
			const processMatch = String(goal.process_type) === selectedProcess
			const productMatch = (selectedProducts.length === 0 && goal.all_product_types) ||
				(checkEqual(selectedProducts, goal.product_code.map(p => String(p.id))))
			return processMatch && productMatch

		})
	}

	weeklyGoal() {
		return this.filteredGoals().find(goal => goal.timerange === 'w')
	}

	monthlyGoal() {
		return this.filteredGoals().find(goal => goal.timerange === 'm')
	}

	render() {
		if (shouldShowChecklist(this.props.team.toLowerCase())) {
			return <Checklist />
		}

		const { processes, products } = this.props
		if (!processes.length) {
			return null
		}

		if (!this.getFilters().selectedProcess) {
			this.setDefaultFilters()
		}

		const { selectedProcess, selectedProducts } = this.getFilters()
		const { pinsTabIsActive } = this.state

		return (
			<div className="dashboard">
				<ApplicationSectionHeader>Dashboard</ApplicationSectionHeader>
				<div className="dashboard-content">
					<ProductionTrends
						processes={processes}
						products={products}
						selectedProcess={selectedProcess}
						selectedProducts={selectedProducts}
						onFilterChange={this.handleFilterChange}
						weeklyGoal={this.weeklyGoal()}
						monthlyGoal={this.monthlyGoal()}
						onEditGoal={this.handleEditGoal}
						onDeleteGoal={this.handleDeleteGoal}
						setActiveTabTo={this.setActiveTabTo}
					/>
					<GoalsSideBar pinsTabIsActive={pinsTabIsActive} setActiveTabTo={this.setActiveTabTo}/>
					{this.renderUserAttributeAnnouncementDialog()}
				</div>
			</div>
		)
	}
	
	renderUserAttributeAnnouncementDialog() {
		return (
			<PageSpecificNewFeatureIntro
				onClose={this.handleCloseAnnouncement.bind(this)}
				content="Keep your mission critical goals in focus. You can now sync your goals with real-time production trends, navigate quickly between trends and activity logs, and save important views of your data so key insights are just a click away."
				title="Introducing revamped trends and goals"
				finalCallToAction="Learn about revamped goals and trends"
				imgSrc="goal-setting"
				imgHeightWithUnits="358px"
				link="https://polymer.helpscoutdocs.com/article/13-setting-goals-and-pinning-trend-views-on-the-dashboard"
				localStorageVarName="TIME_ATTRIBUTE_INFO"
			/>)
	}
	
	handleCloseAnnouncement() {
		this.setState({ isAnnouncementOpen: false })
	}
}

const mapStateToProps = (state/*, props*/) => {
	let { data, ui } = state.users
	let team = data[ui.activeUser].user.team_name
	const isFetchingData = state.processes.ui.isFetchingData || state.products.ui.isFetchingData
	return {
		team: team,
		processes: state.processes.data,
		products: state.products.data,
		goals: state.goals.data,
		pins: state.pins.data,
		isFetchingData: isFetchingData
	}
}
export default connect(mapStateToProps)(Home)
