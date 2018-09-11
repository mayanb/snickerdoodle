import React from 'react'
import Card from '../Card/Card'
import { InputNumber } from 'antd'
import { Peripherals } from './TaskForm'
import { RM } from '../../utilities/constants'

const TIME_TO_STAY_UNSAVED = 1000 // Saving represents a significant backend/DB change. We don't want ot over-fire.
const TIME_TO_LOAD = 0 //any extra time you want to show the loader for
const TIME_TO_SHOW_SAVED = 1500

export default function TaskCogs({ task, onSaveCost }) {
	const graphHasCycles = task.graphHasCycles
	if (graphHasCycles === undefined) {
		return <div>loading</div>
	} else if (graphHasCycles === true) {
		return <div>Sorry, has cycles. Impossible to calculate cost</div>
	} else {
		return (
			<Card>
				<div className="task-cogs">
					<UpdatingCost cost={task.cost} category={task.process_type.category} onSaveCost={onSaveCost} />
					<StaticCost label="Remaining value" cost={task.remaining_worth} />
				</div>
			</Card>
		)
	}
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
			if(newCost === this.state.draftCost && newCost !== this.props.cost) {
				this.handleSave(newCost)
			}
		}, TIME_TO_STAY_UNSAVED)
	}
	
	handleSave(newCost) {
		if (isNaN(newCost)) {
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