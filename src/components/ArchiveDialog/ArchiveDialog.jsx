import React from 'react'
import Dialog from '../Card/Dialog.jsx'
import Button from '../Button/Button.jsx'
import './styles/archivedialog.css'

export default function ArchiveDialog({onCancel, onSubmit, isArchiving, code, name}) {
	return (
		<Dialog onToggle={onCancel}>
			<div className="archive-dialog">
				<div className="archive-dialog-header">
					<span>Delete process</span>
					<i className="material-icons" onClick={onCancel}>close</i>
				</div>
				<div className="archive-rule" style={{marginLeft: "-32px", marginRight: "-20px", width: "120%"}} />
				<span>Are you sure you want to delete</span>
				<span className="emphasized">{` (${code}) ${name} `}</span>
				<span>from your factory?</span>
				<div className="archive-actions">
					<Button wide type="blue-outline" onClick={onCancel}>Cancel</Button>
					<Button wide type="red" isLoading={isArchiving} onClick={onSubmit}>Delete process</Button>
				</div>
			</div>
		</Dialog>
	)
}