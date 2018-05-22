import React from 'react'
import ReactImageFallback from "react-image-fallback"

export default function Img({src, useExtension, ...rest}) {
	let ext = useExtension ? '' : '.png' 
	let srcImg = getSrcImg(src, ext)
	let errorImg = `${process.env.PUBLIC_URL}/img/default@3x.png`
	return (
		<ReactImageFallback src={srcImg} fallbackImage={errorImg} {...rest}/>
	)
}

export function ic(icon) {
	return icon.substring(0, icon.length - 4) + "@3x"
}

export function getSrcImg(src, ext='.png') {
	let k = `${process.env.PUBLIC_URL}/img/${src}${ext}`
	console.log(k)
	return k
}
