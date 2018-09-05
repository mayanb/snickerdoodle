import React from 'react'
import Card from '../Card/Card'
import { InputNumber } from 'antd'
import { Peripherals } from './TaskForm'
import { RM } from '../../utilities/constants'

const TIME_TO_STAY_UNSAVED = 500
const TIME_TO_LOAD = 0 //any extra time you want to show the loader for
const TIME_TO_SHOW_SAVED = 1500

export default function TaskCogs({ task, onSaveCost }) {
	return (
		<Card>
			<div style={{display: "flex", flexDirection: "column"}}>
				<span style={{fontWeight:700}}>COGS data</span>
				<Cost cost={task.cost} category={task.process_type.category} onSaveCost={onSaveCost}/>
				<span>Remaining value: {format(task.remaining_worth)}</span>
			</div>
		</Card>
	)
}

class Cost extends React.Component {
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
			<div>
				<span>Cost of raw material:</span>
				<InputNumber
					defaultValue={cost || 0}
					formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
					parser={value => value.replace(/\$\s?|(,*)/g, '')}
					onChange={this.handleChange}
				/>
				<Peripherals {...this.state} onRetry={this.handleSave} />
			</div>
		) : <div>Cost to create: {cost}</div>
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