import React from 'react'

export default function Img({src, ...rest}) {
	return (
		<img src={`${process.env.PUBLIC_URL}/img/${src}.png`} alt="" {...rest}/>
	)
}