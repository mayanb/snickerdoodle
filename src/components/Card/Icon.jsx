import React from 'react'
import {colorHash} from '../../utilities/stringutils'

export default function Icon(props) {
	let size = props.size || "32px"
	let fontSize = (parseInt(props.size)/2) + "px"
	return (
		<div className="icon" style={{height: size, width:size, borderRadius: size, backgroundColor: colorHash(props.content)}}>
			<span style={{lineHeight: size, fontSize: fontSize, minWidth: size}}>{props.content.substring(0,1).toUpperCase()}</span>
		</div>
	)
}
