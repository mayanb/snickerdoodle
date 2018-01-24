import React from 'react'
import './styles/objectlistheader.css'

export default class ObjectListHeader extends React.Component {
	render() {
		return (
			<div className="object-list-header">
				{this.props.children}
			</div>
		)
	}
}

