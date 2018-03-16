import React from 'react'
import Spinner from 'react-spinkit'
import './styles/loading.css'

export default function Loading({ isFetchingData, spinnerProps, children }) {
	if (isFetchingData)
		return (
			<div className="loading">
				<Spinner fadeIn="quarter" name={"circle"} {...spinnerProps} />
			</div>
		)
	else
		return (
			<div>
				{children}
			</div>
		)
}