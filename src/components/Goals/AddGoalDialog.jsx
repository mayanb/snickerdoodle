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
		this.state = {process_type: null, product_type: null, goal: "", timerange: null}
		this.handleAddGoal = this.handleAddGoal.bind(this)

	}

	componentDidMount() {
		this.props.dispatch(processActions.fetchProcesses())
		this.props.dispatch(productActions.fetchProducts())
	}

	render() {
		return (
			<Dialog>
				<h1>Make a new goal</h1>
				<div style={{maxWidth: "300px"}} >
				<div>
					<Select
						openOnFocus
						value={this.state.process_type}
						options={this.props.processes}
						labelKey={'name'}
						valueKey={'id'}
						placeholder="Select a process type to track"
						onChange={(newVal) => this.onInputChange('process_type', newVal)}
					/>
				</div>
				<div>
					<Select 
						multi={true}
						openOnFocus
						value={this.state.product_type}
						options={this.props.products}
						labelKey={'name'}
						valueKey={'id'}
						placeholder="Select a product type - default is all"
						onChange={(newVal) => this.onInputChange('product_type', newVal)}
					/>
				</div>
				<div>
					<Select
						openOnFocus	
						value={this.state.timerange}
						options={[{"name": "Day", "type": "d"},{"name": "Week", "type": "w"},{"name": "Month", "type": "m"}]}
						labelKey={'name'}
						valueKey={'type'}
						placeholder="Select a time period for this goal"
						onChange={(newVal) => this.onInputChange('timerange', newVal)}
					/>
				</div>
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
		console.log(this.state)
		console.log(this.state.goal)
		if(!this.state.goal || this.state.goal.trim() === '' || isNaN(Number(this.state.goal)) ) {
			this.state.goal = undefined
			alert('Goal must be a valid number')
		}
		if(!this.state.product_type) {
			this.state.product_type = null
			// alert('Product Type must be selected')
		}
		if(!this.state.process_type) {
			this.state.process_type = undefined
			alert('Process Type must be selected')
		}

		if(!this.state.timerange) {
			this.state.timerange = undefined
			alert('Time period must be selected')
		}
		if(this.state.process_type && this.state.goal && this.state.timerange) {
			console.log("hi")
			let {users} = this.props 
			let userprofile = users.data[users.ui.activeUser].user.profile_id
			let product_types = "ALL"
			console.log(this.state.product_type)
			if (this.state.product_type)
			{
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
  return {
  	users: state.users,
    processes: state.processes.data,
    products: state.products.data,
  }
}

const connectedAddGoalDialog = connect(mapStateToProps)(AddGoalDialog)

export default connectedAddGoalDialog

