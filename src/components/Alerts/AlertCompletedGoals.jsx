import React from 'react'
import {pluralize, gerund} from '../../utilities/stringutils'
import Alert from './Alert'
import {toArray} from '../../utilities/arrayutils'

export default function AlertGoals(props) {
	let { goals, isCompleted } = props
	if (!goals) {
		return false
	}
	goals = toArray(JSON.parse(goals.variable_content))

	if (!goals || !goals.length) {
			return false
	}

	let alert = `You didn't complete ${goals.length} ${pluralize(goals.length, 'goal')} last week. `
	if(isCompleted) {
		alert = `Hooray! You completed ${goals.length} ${pluralize(goals.length, 'goal')} last week. `
	}
	return (
		<Alert positive={isCompleted} negative={!isCompleted} alert={alert}>
			{
				goals.map(function (t, i) {
					return <GoalInfo key={i} {...t} />
				})
			}
		</Alert>
	)
}

function GoalInfo(props) {
	return (
		<div><span>
			{`${gerund(props.process_name)} ${parseInt(props.goal)} ${pluralize(props.goal, props.process_unit)} ${getProductTypeString(props.product_code, props.all_product_types)}`}
		</span></div>
	)
}

function getProductTypeString(product_codes, all) {
	if (all || !product_codes || !product_codes.length ) {
		return ""
	}
	if (product_codes.length == 1) {
		return 'of ' + product_codes[0].code
	} else {
		return `of ${product_codes[0].code} and other`
	}
}