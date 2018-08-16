import React from 'react'
import { Progress } from 'antd';
import Img from '../Img/Img'
import './styles/productionaside.css'

export class ProductionAside extends React.Component {
	constructor(props) {
		super(props)
		let mockData = [
			{
				process: 'Package',
				product: 'TUM',
				amount_remaining: 1200,
				monthly_goal: {created: 6000, goal: 10000},
				daily_goal: 340,
				warning: true
			},
			{
				process: 'Package',
				product: 'CRT',
				amount_remaining: 1200,
				monthly_goal: {created: 600, goal: 1000},
				daily_goal: 34,
				warning: false
			},
			{
				process: 'Foil Bar Samples',
				product: 'MD16',
				amount_remaining: 1200,
				monthly_goal: {created: 600, goal: 1000},
				daily_goal: 34,
				warning: false
			},
			{
				process: 'Package',
				product: 'MD16',
				amount_remaining: 1200,
				monthly_goal: {created: 600, goal: 1000},
				daily_goal: 34,
				warning: false
			},
			{
				process: 'Foil Bar Samples',
				product: 'CV17',
				amount_remaining: 1200,
				monthly_goal: {created: 6000, goal: 10000},
				daily_goal: 34,
				warning: false
			},
		]

		this.state = {
			data: mockData
		}
	}

	componentDidMount() {

	}

	render() {
		const { data } = this.state
		return (
			<div className='production-aside-container'>
				<div className='title'>In Production this Month</div>
				{ data && data.map(item => this.renderItem(item)) }
			</div>
		)
	}

	renderItem(item) {
		const { process, product, amount_remaining, monthly_goal, daily_goal, warning } = item
		const percent = monthly_goal.created / monthly_goal.goal * 100
		return (
			<div className='item-container' key={`${process} ${product}`}>
				<Progress strokeLinecap='square' showInfo={false} percent={percent} style={{marginTop: 'none'}}/>
				<div className='content-container'>
					<div className='title-container'>
						<div className='title'>{`${process} ${product}`}</div>

						{ warning && 
							<div className='warning'>
								<Img src='warning@2x' height="20px" />
							</div> 
						}
					</div>
					<div className='info-container'>
						<div className='label'>In Inventory</div>
						<div className='value'>{amount_remaining}</div>
					</div>
					<div className='info-container'>
						<div className='label'>Monthly Goal</div>
						<div className='value'>{`${monthly_goal.created}/${monthly_goal.goal}`}</div>
					</div>
					<div className='info-container'>
						<div className='label'>Daily Goal</div>
						<div className='value'>{daily_goal}</div>
					</div>
				</div>
			</div>
		)
	}

	handleSelectRow(i) {
		//this.props.dispatch(actions.selectInventory(i))
	}
}
