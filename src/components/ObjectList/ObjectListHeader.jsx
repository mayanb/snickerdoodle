import React from 'react'
import './styles/objectlistheader.css'
import Img from '../Img/Img'

export default class ObjectListHeader extends React.Component {
	constructor(props) {
		super(props)

		this.handleReorder = this.handleReorder.bind(this)
	}


	render() {
		const { columns, ordering } = this.props
		return (
			<div className="object-list-header">
				{columns.map((column, i) => <HeaderCell
					column={column}
					onReorder={this.handleReorder}
					active={getField(ordering) === column.field}
					reverse={isReverse(ordering)}
					key={i}
				/>)}
			</div>
		)
	}

	handleReorder(newField) {
		const { ordering } = this.props

		if (!newField) {
			return
		}

		const oldReverse = isReverse(ordering)
		const oldField = getField(ordering)
		const newReverse = newField === oldField ? !oldReverse : false
		const newOrdering = newReverse ? `-${newField}` : newField
		this.props.onReorder(newOrdering)
	}
}

function isReverse(ordering) {
	return ordering[0] === '-'
}

function getField(ordering) {
	return isReverse(ordering) ? ordering.slice(1) : ordering
}

function HeaderCell({ column, onReorder, active, reverse }) {
	const className = 'item ' + column.className +
		(column.field ? ' can-sort' : '') +
		(active ? ' active' : '') +
		(reverse ? ' reverse' : '')
	return (
		<div className={className}
		     onClick={() => onReorder(column.field)}
		>
			{column.title}
			{active && <Img src="drag@3x" />}
		</div>
	)

}

