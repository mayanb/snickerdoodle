import React from 'react'
import './styles/objectlist.css'

export default class ObjectList extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		let className = 'object-list'
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


