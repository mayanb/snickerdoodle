import React from 'react'


export default function WalkthroughButton({title, ...rest}) {
	return <button className="walkthrough-button" {...rest}>{title}</button>
}