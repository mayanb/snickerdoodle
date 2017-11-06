import React from 'react'
import Dialog from '../Card/Dialog'
import Button from '../Card/Button'

export default function MustConnectGoogleDialog(props) {
	return (
		<Dialog onToggle={props.onToggle}>
			<h1>Connect your google account</h1>
			<span>In order to import activity information to a Google Sheet, you first need to connect your Polymer account to your Google account.</span>

			<div className="rule" style={{marginLeft: "-32px", marginRight: "-20px", width: "120%"}} />

			<div className="create-process-buttons">
				<Button secondary onClick={props.onToggle}>Cancel</Button>
				<Button onClick={() => window.location.href = window.location.origin + '/account'}>Go to my account</Button>
			</div>

		</Dialog>
	)
}