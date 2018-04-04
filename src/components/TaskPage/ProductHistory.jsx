import React from 'react'
import './styles/producthistory.css'

export default class ProductHistory extends React.Component {
	render() {
		return (
			<div className="product-history">
				<div className="title">
					Product History
				</div>
				<div className="task-detail">
					{this.props.children}
				</div>
			</div>
		)
	}
}