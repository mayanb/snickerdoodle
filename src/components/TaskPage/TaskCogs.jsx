import React from 'react'
import Card from '../Card/Card'
import { InputNumber, Tag } from 'antd'
import { Peripherals } from './TaskForm'
import { RM } from '../../utilities/constants'

const TIME_TO_STAY_UNSAVED = 1000 // Saving represents a significant backend/DB change. We don't want to over-fire.
const TIME_TO_LOAD = 0 //any extra time you want to show the loader for
const TIME_TO_SHOW_SAVED = 1500


export default function TaskCogs({ task, onSaveCost }) {
	const { cost, remaining_worth, graph_has_cycles } = task
	const loading = graph_has_cycles === undefined
	return (
		<Card>
			<div className="task-cogs">
				<div style={{display: loading ? 'block' : 'none'}}>Loading cost data...</div>
				<UpdatingCostAndRemainingWorth
					cost={cost}
					remaining_worth={remaining_worth}
					category={task.process_type.category}
					onSaveCost={onSaveCost}
					loading={loading}
					graph_has_cycles={graph_has_cycles}
				/>
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


function StaticCost({label, cost, onSave, ...peripheralsInfo}) {
	return (
		<div className="task-cogs-row">
			<div className="info">
				<div>{label}:</div>
				<div>{format(cost)}</div>
			</div>
			<Peripherals {...peripheralsInfo} onRetry={onSave} />
		</div>
	)
}


class UpdatingCostAndRemainingWorth extends React.Component {
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
		const { cost, remaining_worth, category, loading, graph_has_cycles } = this.props
		
		if (category === RM) {
			return (
				<div style={{display: loading || graph_has_cycles ? 'none' : 'block'}}>
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
						{isValidDollarAmount(this.state.draftCost || 0) || <Tag color="red">Invalid</Tag>}
					</div>
					<StaticCost label="Remaining value" cost={remaining_worth} onSave={this.handleSave} {...this.state} />
				</div>
			)
		}
		
		return (
			<div style={{display: loading || graph_has_cycles ? 'none' : 'block'}}>
				<StaticCost label="Cost to create" cost={cost} />
				<StaticCost label="Remaining value" cost={remaining_worth} />
			</div>
		)
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


// Helper functions

function format(n) {
	return '$' + parseFloat(n || 0).toFixed(2)
}

function isValidDollarAmount(num) {
	if (isNaN(num)) {
		return false
	}
	const dollarAmountRegex =  /^(\d{1,5}|\d{0,5}\.\d{1,2})$/g // https://stackoverflow.com/questions/15773309/regex-to-match-value-up-to-2-decimal
	const matches = num.toString().match(dollarAmountRegex)
	return matches && matches.length === 1 && matches[0] === num.toString()
}