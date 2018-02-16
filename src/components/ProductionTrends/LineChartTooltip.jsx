import React from 'react'
import './styles/linecharttooltip.css'

export default function Tooltip({ x, y, period, total, height, width }) {
	if (!x && !y) {
		return null
	}

	return (
		<div className="line-chart-tooltip" style={{
			top: y,
			left: x,
			height: height,
			width: width
		}}>
			<div>
				<span className="title">Period: </span>{period}
			</div>
			<div>
				<span className="title">Total: </span>{total}
			</div>
		</div>
	)
}
