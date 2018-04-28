import React from 'react'
import { ElementTitle } from '../Element/Element'

export default function ProductInformation({ product }) {
	const { icon, code, name } = product
	return (
		<div className="product-information">
			<ElementTitle
				icon={icon}
				text={`(${code}) ${name}`}
				buttonTitle={null}
			/>
		</div>
	)
}