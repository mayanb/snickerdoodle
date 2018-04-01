import React from 'react'
import Spinner from 'react-spinkit'
import './styles/button.css'

export default function Button({type = 'blue', children, isLoading, wide, ...rest}) {
	// if it's loading, it's also disabled
	let loading = isLoading && 'button-loading'
	let spinnerColor = type === 'red' ? 'white' : 'gray'
	let wideClass = wide && 'button-wide'

	return (
		<button className={`button button-${type} ${loading} ${wideClass}`} {...rest}>
			{ isLoading ? <Spinner name="three-bounce" color={spinnerColor} fadeIn="none" /> : children }
		</button>
	)
}