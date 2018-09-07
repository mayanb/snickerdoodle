import React from 'react'
import './styles/objectlistitem.css'



export default class ObjectListItem extends React.Component {

	render() {
		let className = 'object-list-item'
		if(this.props.className) {
			className = `${className} ${this.props.className}`
		}
		
		return (
			<div {...this.props} className={className}>
				{this.props.children}
			</div>
		)
	}
}


