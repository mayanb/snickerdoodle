import React from 'react'
import Icon from '../Card/Icon'
import ButtonDropdown from '../Card/ButtonDropdown'

export function ElementHeader(props) {


	return (
		<div className="products-card-section products-card-header">
			<div className="products-card-icon" style={{height: "24px"}}>
					<Icon src="" size="40px" content={props.name}/>
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