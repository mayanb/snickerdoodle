import React from 'react'

export default function DialogFooter(props) {
	return (
		<div className="dialog-header">
			<Rule />
			{ props.children }
		</div>
	)
}

function Rule(props) {
	return <div className="rule" style={{marginLeft: "-32px", marginRight: "-20px", width: "120%"}}/>
}