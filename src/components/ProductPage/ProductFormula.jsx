import React from 'react'

export default function ProductFormula(props) {
	let {attribute, formula} = props
	return (
		<div className="recipe-formula">
			<div className="lhs">
				<span className="name">{attribute.name}</span>
				<span className="datatype">{attribute.datatype}</span>
			</div>
			<div className="rhs">
				<span className="formula-string">{attribute.comparator} {attribute.formula}</span>
			</div>
		</div>
	)
}