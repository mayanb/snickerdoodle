import React from 'react'
import {colorHash} from '../../utilities/stringutils'
import Img from '../Img/Img'

export default function Icon(props) {
	let size = props.size || "32px"

	if (props.src) {
		return <Img height={props.size} src={props.src} />
	}


	return (
		<div className="icon" style={{height: size, width:size, minWidth:size, minHeight:size, borderRadius: size, backgroundColor: colorHash(props.content)}}>
			<span style={{fontSize: parseInt(size,10)/2 + "px", minWidth:size, minHeight:size, lineHeight:size}}>{props.content.substring(0,1).toUpperCase()}</span>
		</div>
	)
}