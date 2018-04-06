import React from 'react'
import Button from '../Card/Button'
import './styles/formdialog.css'
import Loading from '../Loading/Loading'
import DialogHeader from '../Dialog/DialogHeader'

export default function FormDialog(props) {
	const extraClassNames = props.className ? props.className : ''
	return (
		<div className="dialog-container">
			<div className="dialog-shim" onClick={props.onToggle} />
			<div className={"dialog-card form-dialog " + extraClassNames}>
				<DialogHeader onToggle={props.onToggle}>{props.title}</DialogHeader>
				<div className="body">
					<Loading isFetchingData={props.isFetchingData}>
						{props.children}
						<Button onClick={props.onSave}>
							{props.submitButtonText ? props.submitButtonText : 'Save'}
						</Button>
					</Loading>
				</div>
			</div>
		</div>
	)
}
