import React from 'react'
import './styles/linecharttooltip.css'

export default function Tooltip({ x, y, lastYear, thisYear, height, width }) {
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
				<span className="title">This Year: </span>{thisYear}
			</div>
			<div>
				<span className="title">Last Year: </span>{lastYear}
			</div>
		</div>
	)
}
