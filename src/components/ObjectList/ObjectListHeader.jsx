import React from 'react'
import './styles/objectlistheader.css'

export default class ObjectListHeader extends React.Component {
	constructor(props) {
		super(props)

		this.handleReorder = this.handleReorder.bind(this)
	}


	render() {
		const { columns } = this.props
		return (
			<div className="object-list-header">
				{columns.map((column, i) => <HeaderCell
					column={column}
					onReorder={this.handleReorder}
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

		const oldReverse = ordering[0] === '-'
		const oldField = oldReverse ? ordering.slice(1) : ordering
		const newReverse = newField === oldField ? !oldReverse : false
		const newOrdering = newReverse ? `-${newField}` : newField
		this.props.onReorder(newOrdering)
	}
}

function HeaderCell({ column, onReorder }) {
	const className = column.className + (column.field ? ' can-sort' : '')
	return (
		<div className={className}
		     onClick={() => onReorder(column.field)}
		>
			{column.title}
		</div>
	)

}

