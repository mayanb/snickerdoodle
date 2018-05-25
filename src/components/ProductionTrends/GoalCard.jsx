import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../Goals/GoalsActions'
import api from '../WaffleconeAPI/api.jsx'
import Input from '../Inputs/Input'
import { Modal, Button } from 'antd'
import moment from 'moment'
import { pluralize } from '../../utilities/stringutils'
import { Peripherals } from '../TaskPage/TaskForm'
import './styles/goalcard.css'
import { GOALS } from '../../utilities/constants'

const TIME_TO_SHOW_SAVED = 1500

class GoalCard extends React.Component {
	constructor(props) {
		super(props)

		this.handleDelete = this.handleDelete.bind(this)
		this.handleConfirmDelete = this.handleConfirmDelete.bind(this)
		this.handleAdd = this.handleAdd.bind(this)
		this.handleInputChange = this.handleInputChange.bind(this)
		this.handleSave = this.handleSave.bind(this)

		this.state = {
			amount: (this.props.goal && Number(this.props.goal.goal)) || 0,
			isDeletingGoal: false,
			isLoading: false,
			justSaved: false,
			hasError: false,
		}
	}

	render() {
		const { goal } = this.props

		return (
			<div className="goal-card-container">
				{!goal && this.renderAddGoal()}
				{goal && this.renderGoalCard()}
			</div>
		)
	}

	renderAddGoal() {
		const { timerange } = this.props
		const rangeLabel = timerange === 'm' ? 'Monthly' : 'Weekly'
		return (
			<div className="add-goal" onClick={this.handleAdd}>
				<Button type="primary" ghost >+ Add a {rangeLabel} goal</Button>
			</div>
		)
	}

	renderGoalCard() {
		const { goal } = this.props
		const date = moment(goal.created_at).format('MMMM D, YYYY')

		return (
			<div className="goal-card">
				<div className="top-row">
					<div className="goal-amount">
						Goal
						<Input
							value={this.state.amount}
							onChange={this.handleInputChange}
							type="number"
						/>
						{pluralize(2, goal.process_unit)}
					</div>
					<i className="material-icons delete" onClick={this.handleDelete}>delete</i>
				</div>
				<div className="bottom-row">
					<div className="set-by">
						{`Set by ${goal.userprofile_name} on ${date}`}
					</div>
					<Peripherals
						isLoading={this.state.isLoading}
						justSaved={this.state.justSaved}
						hasError={this.state.hasError}
						onRetry={this.handleSave}
					/>
				</div>
			</div>
		)
	}

	handleAdd() {
		const { timerange, selectedProcess, selectedProducts, setActiveTabTo } = this.props
		const user = api.get_active_user().user
		const data = {
			userprofile: user.profile_id,
			process_type: selectedProcess,
			input_products: selectedProducts.length ? selectedProducts.join(',') : 'ALL',
			goal: this.state.amount,
			timerange: timerange
		}
		this.props.dispatch(actions.postCreateGoal(data))
		setActiveTabTo(GOALS)
	}

	handleInputChange(e) {
		this.setState({ amount: e.target.value }, this.handleSave)
	}

	handleSave() {
		if (this.state.amount === '') {
			return
		}
		this.props.setActiveTabTo(GOALS)
		this.setState({ isLoading: true, hasError: false })
		return this.props.onEdit(this.props.goal, this.state.amount)
			.then(() => {
				this.setState({ isLoading: false, justSaved: true })
				window.setTimeout(() => this.setState({ justSaved: false }), TIME_TO_SHOW_SAVED)
			})
			.catch(e => {
				this.setState({ isLoading: false, hasError: true, justSaved: false })
			})
	}

	handleDelete() {
		this.props.setActiveTabTo(GOALS)
		Modal.confirm({
			title: 'Remove goal',
			content: "Are you sure you want to remove this goal?",
			okText: 'Yes, I\'m sure',
			okType: 'danger',
			onOk: this.handleConfirmDelete,
			onCancel: () => {}
		})
	}

	handleConfirmDelete() {
		this.props.onDelete(this.props.goal)
	}
}

const mapStateToProps = (state, props) => {
	return {}
}

export default connect(mapStateToProps)(GoalCard)
