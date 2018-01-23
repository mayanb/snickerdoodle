import React from 'react'
import Img from '../Img/Img'

export default function WalkthroughHint(props) {
	return (
		<div className="walkthrough-hint">
			<Img src="Idea" height="24px"/>
			<span>{props.children}</span>
		</div>
	)
}