import React from 'react'
import Button from '../Card/Button'
import Img from '../Img/Img'
import './styles/formdialog.css'

export default function FormDialog(props) {
	const extraClassNames = props.className ? props.className : ''
	return (
		<div className="dialog-container">
			<div className="dialog-shim" onClick={props.onToggle} />
			<div className={"dialog-card form-dialog " + extraClassNames}>
				<div className="header">
					{props.title}
					<Img
						className="cancel"
						onClick={props.onToggle}
						src="delete"
					/>
				</div>
				<div className="body">
					{props.children}
					<Button onClick={props.onSave}>
						Save
					</Button>
				</div>
			</div>
		</div>
	)
}
