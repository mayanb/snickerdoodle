import React from 'react'
import ReactImageFallback from "react-image-fallback"
import {pluralize} from '../../utilities/stringutils'

export default function ActivityRow(props) {
	console.log(props)
	let title = `${props.process_name} ${props.product_code}`
	let code = `${props.process_code}`
	return (
		<div className="activity-row">
			<div className="first"><Icon img={props.process_name.toLowerCase().replace(/\s/g, '')}/></div>
			<div className="second"><span>{code}</span></div>
			<div className="third"><span>{title}</span></div>
			<div className="fourth"><span>{`${parseInt(props.outputs)} ${pluralize(props.outputs, props.process_unit)}`}</span></div>
			<div className="fifth"><span>{props.runs}</span></div>
		</div>
	)
}

function Icon(props) {
	var symbol = false 
	if (props.img) {
		let errorImg = `${process.env.PUBLIC_URL}/public/img/default@3x.png`
		symbol = <ReactImageFallback src={process.env.PUBLIC_URL + `/img/${props.img}@3x.png`} fallbackImage={errorImg}/>
	} else if (props.icon) {
		symbol = <span><i className="material-icons arrow">{props.icon}</i></span>
	}
	return symbol
}