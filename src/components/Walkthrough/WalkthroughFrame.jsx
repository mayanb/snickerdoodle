import React from 'react'
import Img from '../Img/Img'
import './styles/walkthroughframe.css'

export default function WalkthroughFrame({children, ...rest}) {
	return (
		<div className="walkthrough" {...rest} >
			<Img src='logo-blue'/>
			{children}
		</div>
	)
}