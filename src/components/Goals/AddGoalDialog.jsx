import React from 'react'
import { connect } from 'react-redux'
import update from 'immutability-helper'
import * as actions from './GoalsActions'
import * as processActions from '../Processes/ProcessesActions'
import * as productActions from '../Products/ProductsActions'
import Dialog from '../Card/Dialog'
import Button from '../Card/Button'
import Select from 'react-select';

class AddGoalDialog extends React.Component {
	constructor(props) {
		super(props)
		this.state = {process_type: null, product_type: null, goal: ""}
	}

	componentDidMount() {
		this.props.dispatch(processActions.fetchProcesses())
		this.props.dispatch(productActions.fetchProducts())
	}

	render() {
		return (
			<Dialog>
				<h1>Make a new goal</h1>
				<div style={{maxWidth: "200px"}} >
					<Select
						value={this.state.process_type}
						options={this.props.processes}
						labelKey={'name'}
						valueKey={'id'}
						placeholder="Select a process type to track"
						onChange={(newVal) => this.onInputChange('process_type', newVal)}
					/>
					<Select
						value={this.state.product_type}
						options={this.props.products}
						labelKey={'name'}
						valueKey={'id'}
						placeholder="Select a product type to track"
						onChange={(newVal) => this.onInputChange('product_type', newVal)}
					/>
					<input 
						type="text" 
						placeholder="Target amount" 
						value={this.state.goal} 
						onChange={(e) => this.onInputChange('goal', e.target.value)}
					/>
					<span>{this.state.process?`${this.state.process_type.unit}(s)`:"units"}</span>
				</div>
				{ this.renderRule() }
				{ this.renderButtons() }
			</Dialog>
		)
	}

	renderRule() {
		return (
			<div className="rule" style={{marginLeft: "-32px", marginRight: "-20px", width: "120%"}} />
		)
	}


	renderButtons() {
		return (
			<div className="create-process-buttons">
				<Button secondary onClick={this.props.onToggle}>Cancel</Button>
				<Button onClick={this.handleAddGoal}>Create</Button>
			</div>
		)
	}

	onInputChange(key, val) {
		this.setState({[key]: val})
	}

	handleAddGoal() {
		let {users} = this.props 
		let userprofile = users.data[users.ui.activeUser].user.profile_id
		let data = update(this.state, {$merge: {userprofile: userprofile}})
		this.props.dispatch(actions.postCreateGoal(data))
		this.props.onToggle()
	}
}

const mapStateToProps = (state/*, props*/) => {
  return {
  	users: state.users,
    processes: state.processes.data,
    products: state.products.data,
  }
}

const connectedAddGoalDialog = connect(mapStateToProps)(AddGoalDialog)

export default connectedAddGoalDialog
