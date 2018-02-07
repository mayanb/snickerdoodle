import React from 'react'
import { connect } from 'react-redux'
import * as actions from './GoalsActions'
import * as processActions from '../Processes/ProcessesActions'
import * as productActions from '../Products/ProductsActions'
import FormDialog from '../FormDialog/FormDialog'
import Select from 'react-select';
import FormGroup from '../Inputs/FormGroup'
import FormErrors from '../Inputs/FormErrors'
import Input from '../Inputs/Input'
import * as types from './GoalTypes'

class AddGoalDialog extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			process_type: null,
			product_type: null,
			goal: "",
			timerange: this.props.defaultTimerange,
			submitted: false
		}

		this.handleAddGoal = this.handleAddGoal.bind(this)

	}

	componentDidMount() {
		this.props.dispatch(processActions.fetchProcesses())
		this.props.dispatch(productActions.fetchProducts())
	}

	render() {
		const timerangeOptions = [
			{ "name": "Weekly", "type": types.WEEKLY },
			{ "name": "Monthly", "type": types.MONTHLY }
		]

		return (
			<FormDialog
				onToggle={this.props.onToggle}
				onSave={this.handleAddGoal}
				title="Create a goal"
				isFetchingData={this.props.isFetchingData}
			>
				<FormGroup label="Process type">
					<Select
						openOnFocus
						clearable={false}
						value={this.state.process_type}
						options={this.props.processes}
						labelKey={'name'}
						valueKey={'id'}
						placeholder="Select a process type"
						onChange={(newVal) => this.onInputChange('process_type', newVal)}
					/>
				</FormGroup>
				<FormGroup label="Product type">
					<Select
						multi={true}
						openOnFocus
						value={this.state.product_type}
						options={this.props.products}
						labelKey={'name'}
						valueKey={'id'}
						placeholder="All product types"
						onChange={(newVal) => this.onInputChange('product_type', newVal)}
					/>
				</FormGroup>
				<FormGroup label="Date range">
					<Select
						openOnFocus
						value={this.state.timerange}
						searchable={false}
						clearable={false}
						options={timerangeOptions}
						labelKey={'name'}
						valueKey={'type'}
						placeholder="Select a time period for this goal"
						onChange={(newVal) => this.onInputChange('timerange', newVal)}
					/>
				</FormGroup>
				<FormGroup label="Target amount">
					<Input
						type="text"
						placeholder="Units"
						value={this.state.goal}
						onChange={(e) => this.onInputChange('goal', e.target.value)}
					/>
				</FormGroup>
				{this.renderErrors()}
			</FormDialog>
		)
	}

	renderErrors() {
		if (this.state.submitted) {
			return (
				<FormErrors errors={this.formErrors()}></FormErrors>
			)
		}
	}

	formErrors() {
		const errors = []
		if (!this.state.goal || this.state.goal.trim() === '' || isNaN(Number(this.state.goal))) {
			errors.push('Goal must be a valid number')
		}
		if (!this.state.process_type) {
			errors.push('Process Type must be selected')
		}
		if (!this.state.timerange) {
			errors.push('Time period must be selected')
		}
		return errors
	}

	onInputChange(key, val) {
		this.setState({ [key]: val })
	}

	handleAddGoal() {
		this.setState({ submitted: true })
		if (this.formErrors().length === 0) {
			let { users } = this.props
			let userprofile = users.data[users.ui.activeUser].user.profile_id
			let product_types = "ALL"
			if (this.state.product_type) {
				product_types = parseProductTypes(this.state.product_type)
			}
			let data = {
				userprofile: userprofile,
				process_type: this.state.process_type.id,
				input_products: product_types,
				goal: this.state.goal,
				timerange: this.state.timerange.type
			}
			this.props.dispatch(actions.postCreateGoal(data))
			this.props.onToggle()
		}

	}
}

function parseProductTypes(product_types) {
	return product_types.map(e => e.id).join(",")
}


const mapStateToProps = (state/*, props*/) => {
	const isFetchiingData = state.processes.ui.isFetchingData || state.products.ui.isFetchingData
	return {
		users: state.users,
		processes: state.processes.data,
		products: state.products.data,
		isFetchingData: isFetchiingData
	}
}

const connectedAddGoalDialog = connect(mapStateToProps)(AddGoalDialog)

export default connectedAddGoalDialog

