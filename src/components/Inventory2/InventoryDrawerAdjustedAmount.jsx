import React from 'react'
import { pluralize, formatNumber } from '../../utilities/stringutils'

export default function InventoryDrawerAdjustedAmount({inventory}) {
	let { adjusted_amount: amount, process_unit: unit } = inventory
	return (
		<div className="adjusted-amount">
			<div className="adjusted-amount-header">
				<span className="amt">{`${formatNumber(amount)} ${pluralize(amount,unit)}`}</span>
				<span className="in-stock">In stock</span>
			</div>
			<Adjuster unit={unit}/>
		</div>
	)
}

function Adjuster({unit}) {
  return (
  	<div className="inv-adjuster">
  		<div>What is the actual stock of this product?</div>
  		<div>
  			<input />
  			<span>Discrepancy: {unit}</span>
  			<button>Save</button>
  		</div>
  	</div>
  )
}