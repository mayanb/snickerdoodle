import React from 'react'
import Button from '../Card/Button'

export default function OrderDetailHeader(props) {
	return (
		<div className="orderdetail-header">
			<div className="title">
				<h1>Order</h1>
				<h2>#966</h2>
			</div>
			<div className="buttons">
				<Button>Complete</Button>
				<Button>Delete</Button>
			</div>
		</div>
	)
}