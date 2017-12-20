import React from 'react'
import Img from '../Img/Img'

export default function Switch(props) {
	let img = "switch@2x"
	if (!props.value) {
		img = "switch-off@2x"
	}
	return <div style={{display: "inline-block", verticalAlign: "middle"}}><Img height="16px" src={img} onClick={props.onClick}/></div>
}