import React from 'react'

export function AccountIntegrationConnecting(props) {
	return <span>Connecting...</span>
}

export function AccountIntegrationConnected(props) {
	return (
		<div className="integration-account" onClick={props.onClick}>
			<span>{props.user.user.gauth_email}</span>
			<i className="material-icons">close</i>
		</div>
	)
}

export function AccountIntegrationDoConnect(props) {
	return <span className="google-connect" onClick={props.onClick}>Connect account</span>
}