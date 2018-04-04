import React from 'react'

export default function Img({src, useExtension, ...rest}) {
	let ext = useExtension ? '' : '.png' 
	return (
		<img src={`${process.env.PUBLIC_URL}/img/${src}${ext}`} alt="" {...rest}/>
	)
}