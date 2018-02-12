import React from 'react'
import Spinner from 'react-spinkit'
import './styles/loading.css'

export default function Loading({ isFetchingData, children }) {
	if (isFetchingData)
		return (
			<div className="loading">
				<Spinner name="circle" />
			</div>
		)
	else
		return (
			<div>
				{children}
			</div>
		)
}