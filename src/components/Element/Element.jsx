import React from 'react'
import Icon from '../Card/Icon'
import ButtonDropdown from '../Card/ButtonDropdown'

export function ElementHeader(props) {


	return (
		<div className="products-card-section products-card-header">
			<div className="products-card-icon" style={{height: "24px"}}>
					<Icon src="" size="24px" content={props.name}/>
				</div>
				<h1 className="products-card-code">
					{props.code}
				</h1>
				<h1 className="products-card-name">
					{props.name}
				</h1>
				<div>
					{props.actions}
				</div>
			</div>
	)
}