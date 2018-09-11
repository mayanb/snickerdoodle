import React from 'react'
import Card from '../Card/Card'
import { InputNumber } from 'antd'
import { Peripherals } from './TaskForm'
import { RM } from '../../utilities/constants'

const TIME_TO_STAY_UNSAVED = 1000 // Saving represents a significant backend/DB change. We don't want ot over-fire.
const TIME_TO_LOAD = 0 //any extra time you want to show the loader for
const TIME_TO_SHOW_SAVED = 1500

export default function TaskCogs({ task, onSaveCost }) {
	const { graph_has_cycles } = task
	const loading = graph_has_cycles === undefined
	return (
		<Card>
			<div className="task-cogs">
				<div style={{display: loading ? 'block' : 'none'}}>Loading cost data...</div>
				<div style={{display: loading || graph_has_cycles ? 'none' : 'block'}}>
					<UpdatingCost cost={task.cost} category={task.process_type.category} onSaveCost={onSaveCost} />
					<StaticCost label="Remaining value" cost={task.remaining_worth} />
				</div>
				<HasCycleMessage task={task} visible={graph_has_cycles} />
			</div>
		</Card>
	)
}

function HasCycleMessage({task, visible}) {
	return (
		<div style={{display: visible ? 'block' : 'none'}}>
			Looks like
			<span style={{fontWeight: 'bold'}}> {task.display} </span>
			has a task listed as both as a descendant and an ancestor. We can't calculate a cost in this case.
		</div>
	)
}

function StaticCost({label, cost}) {
	return (
		<div className="task-cogs-row">
			<div className="info">
				<div>{label}:</div>
				<div>{format(cost)}</div>
			</div>
		</div>
	)
}

class UpdatingCost extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			draftCost: null,
			
			isLoading: false,
			justSaved: false,
			hasError: false,
		}
		
		this.handleSave = this.handleSave.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}
	
	render() {
		const { cost, category } = this.props
		return category === RM ? (
			<div className="task-cogs-row">
				<div className="info">
					<div>Cost of raw material:</div>
					<InputNumber
						defaultValue={cost || 0}
						formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
						parser={value => value.replace(/[^0-9.]+/g, '')}
						onChange={this.handleChange}
					/>
				</div>
				<Peripherals {...this.state} onRetry={this.handleSave} />
			</div>
		) : <StaticCost label="Cost to create" cost={cost} />
	}
	
	handleChange(newCost) {
		this.setState({ draftCost: newCost})
		window.setTimeout(() => {
			if(newCost === this.state.draftCost && newCost !== parseFloat(this.props.cost)) {
				this.handleSave(newCost)
			}
		}, TIME_TO_STAY_UNSAVED)
	}
	
	handleSave(newCost) {
		if (!isValidDollarAmount(newCost)) {
			return
		}
		
		this.setState({ isLoading: true, hasError: false })
		const apiPromise = this.props.onSaveCost(newCost)
		return apiPromise
			.then(() => {
				window.setTimeout(() => this.setState({ isLoading: false, justSaved: true }), TIME_TO_LOAD)
				window.setTimeout(() => this.setState({ justSaved: false }), TIME_TO_LOAD + TIME_TO_SHOW_SAVED)
			})
			.catch(e => {
				this.setState({ isLoading: false, hasError: true, justSaved: false })
			})
	}
}

function format(n) {
	return '$' + parseFloat(n || 0).toFixed(2)
}

function isValidDollarAmount(num) {
	if (isNaN(num)) {
		return false
	}
	const dollarAmountRegex = /^\$?\d{1,3}((,?)(\d{3}))*(\.\d\d)?$/g;
	const matches = num.toString().match(dollarAmountRegex)
	return matches && matches.length === 1 && matches[0] === num.toString()
}