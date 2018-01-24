import React from 'react'
import './styles/walkthroughtooltip.css'

export default function WalkthroughTooltip(props) {
	return (
		<div className="walkthrough-tooltip">
			<div className="tooltipshow">{props.button}</div>
			<span className="tooltiptext">{props.tooltip}</span>
		</div>
	)
}
