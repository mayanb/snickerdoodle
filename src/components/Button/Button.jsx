import React from 'react'
import Spinner from 'react-spinkit'
import './styles/button.css'

export default function Button({type, children, isLoading, wide, ...rest}) {
	// if it's loading, it's also disabled
	let color = isLoading ? "disabled" : type
	let wideClass = wide && 'wide'

	return (
		<button className={`button button-${color} ${wideClass}`} {...rest}>
			{ isLoading ? <Spinner name="three-bounce" color="gray" fadeIn="none" /> : children }
		</button>
	)
}