import React from 'react'
import CardRule from '../Card/CardRule'
import './styles/formula.css'
import Icon from '../Card/Icon'

export default function ProductFormula(props) {
	let {attribute, formula, comparator} = props
	return (
		<div>
			<div className="recipe-formula">
				<div className="lhs">
					<span className="name">{attribute.name}</span>
				</div>
				<div className="comparator">
					<span >{comparator}</span>
				</div>
				<div className="rhs">
					<span>{formula}</span>
				</div>
				<div className="datatype">
					<span>{attribute.datatype}</span>
				</div>
				<div className="user">
					<Icon size="20px" content="ishita" />
				</div>
			</div>
			<CardRule />
		</div>
	)
}