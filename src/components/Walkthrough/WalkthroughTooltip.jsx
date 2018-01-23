import React from 'react'
import './styles/walkthroughtooltip.css'

export default function WalkthroughTooltip(props) {
	return (
		<div className="walkthrough-tooltip">
			<div className="tooltipshow">hover over me</div>
			<span className="tooltiptext">Tooltip</span>
		</div>
	)
}
