import React from 'react'
import Spinner from 'react-spinkit'
import './styles/button.css'

export default function Button({type, children, isLoading, ...rest}) {
	// if it's loading, it's also disabled
	let color = isLoading ? "disabled" : type

	return (
		<button className={`button button-${color}`} {...rest}>
			{ isLoading ? <Spinner name="three-bounce" color="gray" fadeIn="none" /> : children }
		</button>
	)
}