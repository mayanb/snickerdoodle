import React from 'react'
import ReactImageFallback from "react-image-fallback"

export default function Img({src, useExtension, ...rest}) {
	let ext = useExtension ? '' : '.png' 
	let srcImg = `${process.env.PUBLIC_URL}/img/${src}${ext}`
	let errorImg = `${process.env.PUBLIC_URL}/img/default@3x.png`
	return (
		<ReactImageFallback src={srcImg} fallbackImage={errorImg} {...rest}/>
	)
}