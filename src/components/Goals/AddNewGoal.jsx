import React from 'react'

let dashed_style = {
	border: "2px dashed rgba(0,0,0,0.1)", 
	borderRadius: "4px",
	height: "44px",
	width: "100%", 
	cursor: "pointer"
}

let span_style = {
	display: "block",
	textAlign: "center",
	lineHeight: "40px",
	width: "100%",
	color: "rgba(0,0,0,0.3)",
		cursor: "pointer"
}

export default function AddNewGoal(props) {
	return (
		<div className="goal" onClick={props.onClick}>
			<div style={dashed_style}>
				<span style={span_style}> + Add a new goal</span>
			</div>
		</div>
	)
}