import React from 'react'
import {pluralize, gerund} from '../../utilities/stringutils'
import Alert from './Alert'

export default function AlertMissedGoal(props) {
	let goal = props.goal
	let proc = gerund(goal.process_name)
	let g = parseInt(goal.goal)
	let prod = getProductTypeString(goal.product_code)
	let unit = pluralize(g, goal.process_unit)
	let alert = <span>You missed your goal of <span style={{fontWeight: 700}}>{`${proc} ${g} ${prod} ${unit}`}</span> last week.</span>
	
	return (
		<Alert negative alert={alert}>
			<a href="/activity" className="alert-link">View your logs</a>
		</Alert>
	)
}

function getProductTypeString(product_codes) {
	if (!product_codes || !product_codes.length) {
		return ""
	}
	if (product_codes.length == 1) {
		return product_codes[0].code
	} else {
		return `${product_codes[0].code} and other`
	}
}