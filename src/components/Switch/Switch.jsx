import React from 'react'
import Img from '../Img/Img'
import './styles/switch.css'

export default function Switch(props) {
	let img = "switch@2x"
	if (!props.value) {
		img = "switch-off@2x"
	}
	return (
		<div className="switch">
			<Img src={img} onClick={props.onClick} />
		</div>
	)
}
