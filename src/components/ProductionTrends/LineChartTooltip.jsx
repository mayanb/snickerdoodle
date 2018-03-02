import React from 'react'
import './styles/linecharttooltip.css'

export default function Tooltip({ x, y, height, width, children }) {
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
			{children}
		</div>
	)
}
