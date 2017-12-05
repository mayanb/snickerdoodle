import React from 'react'
import {colorHash} from '../../utilities/stringutils'

export default function Icon(props) {
	let size = props.size || "32px"
	return (
		<div className="icon" style={{height: size, width:size, borderRadius: size, backgroundColor: colorHash(props.content)}}>
			<span>{props.content.substring(0,1).toUpperCase()}</span>
		</div>
	)
}