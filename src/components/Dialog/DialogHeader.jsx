import React from 'react'
import Img from '../Img/Img'
import './styles/dialogheader.css'

export default function DialogHeader(props) {
	return (
		<div className="dialog-header">
				{props.children}
				<Img
					className="cancel"
					onClick={props.onToggle}
					src="delete"
				/>
		</div>
	)
}

