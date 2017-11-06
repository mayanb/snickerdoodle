import React from 'react'
import Dialog from '../Card/Dialog'
import Button from '../Card/Button'

export default function MustConnectGoogleDialog(props) {
	return (
		<Dialog onToggle={props.onToggle}>
			<h1>Please enable popups</h1>
			<span>We've created your spreadsheet in Google Drive. To have your spreadsheets open in a new tab after creating them, please allow all popups on this page. You can do this in your browser's address bar.</span>

			<div className="create-process-buttons">
				<Button secondary onClick={props.onToggle}>Got it</Button>
			</div>
			
		</Dialog>
	)
}