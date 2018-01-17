import React from 'react'
import {connect} from 'react-redux'

export default function AvailableAttributes(props) {
	let {attributes, onSelect} = props
	return (
			<div className="available-attributes">
				{
					attributes.map((attr, i) => {
						return (
							<div key={i} onClick={() => onSelect(attr)}>
								<span>{attr.name}</span>
							</div>
						)
					})
				}
			</div>
	)
}