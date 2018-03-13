import React from 'react'
import moment from 'moment'
import { formatAmount } from '../../utilities/stringutils'

export default function AdjustmentHistory({ history, unit }) {
	const historyItems = history ? history.map((item, i) => <HistoryItem key={i} item={item} unit={unit} />) : []

	return (
		<div>
			{historyItems}
		</div>
	)
}

function HistoryItem({ item, unit }) {
	return (
		<div className="history-item">
			{item.type === 'adjustment' ?
				<Adjustment data={item.data} unit={unit} /> :
				<ItemSummary data={item.data} unit={unit} />}
		</div>
	)
}

function Adjustment({ data, unit }) {
	const { startAmount, endAmount, endDate } = data
	const difference = endAmount - startAmount
	const text1 = 'You '
	const text2 = `adjusted inventory by ${formatAmount(difference, unit)}, `
	const text3 = `taking you from ${formatAmount(startAmount, unit)} to ${formatAmount(endAmount, unit)}`

	return (
		<div className="adjustment">
			<div className="description">
				{text1}<span className="bold">{text2}</span>{text3}
			</div>
			<div>
				<div className="adjustment-pill">Adjustment</div>
				<FormattedDate date={endDate} />
			</div>
		</div>
	)
}

function ItemSummary({ data, unit }) {
	const { used_amount, created_amount, startAmount, endAmount, startDate, endDate } = data
	const text1 = 'Your team '
	const text2 = `used ${formatAmount(used_amount, unit)} `
	const text3 = 'and '
	const text4 = `created ${formatAmount(created_amount, unit)} `
	const text5 = `of product, taking you from ${formatAmount(startAmount, unit)} to ${formatAmount(endAmount, unit)}`
	return (
		<div className="item-summary">
			<div className="description">
				{text1}<span className="bold">{text2}</span>{text3}<span className="bold">{text4}</span>{text5}
			</div>
			<DateRange start={startDate} end={endDate} />
		</div>
	)
}

function FormattedDate({ date }) {
	return (
		<span className="formatted-date">
			{moment(date).format('MMM D, YYYY')}
		</span>
	)
}

function DateRange({ start, end }) {
	const startElement = moment(start) < moment(new Date(10, 0, 1)) ? 'Beginning' : <FormattedDate date={start} />
	const endElement = moment(end) > moment(new Date(2200, 0, 1)) ? 'Now' : <FormattedDate date={end} />
	return (
		<div className="date-range">
			{startElement}
			<span> - </span>
			{endElement}
		</div>
	)
}


