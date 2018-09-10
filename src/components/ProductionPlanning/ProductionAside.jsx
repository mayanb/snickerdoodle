import React from 'react'
import { connect } from 'react-redux'
import { dateToUTCString } from '../../utilities/dateutils'
import Img from '../Img/Img'
import * as goalActions from '../Goals/GoalsActions'
import * as activityActions from '../Activity/ActivityActions'
import './styles/productionaside.css'
import { formatAmount } from '../../utilities/stringutils'
import moment from 'moment'

class ProductionAside extends React.Component {
	constructor(props) {
		super(props)
		
		const { user } = this.props
		let startDate = moment().subtract(1, 'months').format('YYYY-MM-DD');
		let endDate = moment(new Date()).format("YYYY-MM-DD")
		let params = {
			team: user.team,
			category_types: 'fg',
			start: dateToUTCString(startDate),
			end: dateToUTCString(endDate),
		}
		this.props.dispatch(activityActions.fetchActivity(params))
		this.props.dispatch(goalActions.fetchGoals())
	}

	componentWillReceiveProps(nextProps) {

	}
	render() {
		const { asideData, selected } = this.props
		return (
			<div className='production-aside-container'>
				<div className='title'>In Production this Month</div>
				{ asideData && asideData.map(group => this.renderGoal(group, selected)) }
			</div>
		)
	}

	renderGoal(group, selected) {
		const { info, w: weeklyGoal, m: monthlyGoal } = group
		const { process_name, process_unit, product_code, process_id, product_id, amount, type } = info
		const warning = null // need to fetch if there are any raw materials running low for this Process/Product type
		let percent = 0
		if (monthlyGoal) {
			percent = monthlyGoal.actual / monthlyGoal.goal * 100
		} else if (weeklyGoal) {
			percent = weeklyGoal.actual / weeklyGoal.goal * 100
		}
		const is_selected = String(process_id) === selected.process_id && String(product_id) === selected.product_id ? true : false

		return (
			<div className={`aside-item-container ${is_selected ? 'selected' : ''}`} key={`${process_name} ${product_code}`} onClick={() => this.handleSelect(process_id, product_id)}>
				{type === 'goal' && <ProgressBar percent={percent} />}
				<div className='content-container'>
					<div className='title-container'>
						<div className='title'>{`${process_name} ${product_code}`}</div>
						{ warning && 
							<div className='warning'>
								<Img src='warning@2x' height="20px" />
							</div> 
						}
					</div>
					<div className='info-container'>
						<div className='label'>Produced</div>
						<div className='value'>{formatAmount(amount, process_unit)}</div>
					</div>
					{ monthlyGoal && 
					<div className='info-container'>
						<div className='label'>Monthly Goal</div>
						<div className='value'>{`${monthlyGoal.actual ? monthlyGoal.actual : 0}/${monthlyGoal.goal}`}</div>
					</div>
					}
					{ weeklyGoal &&
					<div className='info-container'>
						<div className='label'>Weekly Goal</div>
						<div className='value'>{`${weeklyGoal.actual ? weeklyGoal.actual : 0}/${weeklyGoal.goal}`}</div>
					</div>
					}
				</div>
			</div>
		)
	}

	handleSelect(process_id, product_id) {
		this.props.onSelect(String(process_id), String(product_id))
	}
}

function ProgressBar({ percent }) {
	return (
		<div className='outer-progress-bar'>
			<div className='inner-progress-bar' style={{ width: `${percent}%` }}></div>
		</div>
	)
}

function formatAsideData(goals, activities) {
	const groups = {}

	activities.forEach(activity => {
		const key = getProductProcessKey(activity, 'activity')
		if (!groups[key]) {
			groups[key] = {}
		}
		groups[key]['info'] = {
			type: 'activity',
			amount: activity.amount,
			process_id: activity.process_type.id,
			process_name: activity.process_type.name, 
			process_unit: activity.process_type.unit,
			product_id: activity.product_types[0].id,
			product_code: activity.product_types[0].code,
		}
	})

	goals.forEach(goal => {
		if (!goal.is_trashed && !goal.all_product_types) {
			const key = getProductProcessKey(goal, 'goal')
			if (groups[key]) {
				groups[key]['info']['type'] = 'goal'
				groups[key][goal.timerange] = { 
					actual: Math.round(goal.actual), 
					goal: Math.round(goal.goal) 
				}
			}
		}
	})
	
	return Object.values(groups)
}

function getProductProcessKey(item, type) {
	if (type === 'goal') {
		return `${item.process_type}_${item.product_code[0].id}`
	} else {
		return `${item.process_type.id}_${item.product_types[0].id}`
	}
}

const mapStateToProps = (state/*, props*/) => {
	let {data, ui} = state.users
	let user = {}
	if (ui.activeUser && ui.activeUser >= 0 && data[ui.activeUser]) {
		user = data[ui.activeUser].user
	}
	return { 
		asideData: formatAsideData(state.goals.data, state.activity.data),
		user,
	}
}

export default connect(mapStateToProps)(ProductionAside)
