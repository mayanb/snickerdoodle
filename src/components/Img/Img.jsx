import React from 'react'
import ReactImageFallback from "react-image-fallback"

export default function Img({src, useExtension, ...rest}) {
	let ext = useExtension ? '' : '.png' 
	let srcImg = getSrcImg(src, ext)
	let errorImg = `${process.env.PUBLIC_URL}/img/process-icons/default-process-icon@3x.png`
	return (
		<ReactImageFallback src={srcImg} fallbackImage={errorImg} {...rest}/>
	)
}

export function getSrcImg(src, ext='.png') {
	let k = `${process.env.PUBLIC_URL}/img/${src}${ext}`
	return k
}
