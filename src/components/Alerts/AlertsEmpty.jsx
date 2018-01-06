import React from 'react'
import Img from '../Img/Img'

export default function AlertsEmpty(props) {
	return (
		<div className="alerts-empty">
			<span>You're all caught up!</span>
			<Img src="dog_in_space" width="50%" />
		</div>
	)
}