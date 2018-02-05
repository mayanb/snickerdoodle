import React from 'react'
import Icon from '../Card/Icon'

export function ElementHeader(props) {


	return (
		<div className="products-card-section products-card-header">
			<div className="products-card-icon" style={{height: "40px"}}>
					<Icon src={props.icon?ic(props.icon):false} size="40px" content={" "}/>
				</div>
				<h1 className="products-card-code">
					{`${props.name} (${props.code})`}
				</h1>
				<div>
					{props.actions}
				</div>
			</div>
	)
}

function ic(str = "abcd") {
	return `${str.substring(0, str.length-4)}@3x`
}