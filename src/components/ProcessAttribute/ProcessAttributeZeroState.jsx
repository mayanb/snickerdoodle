import React from 'react'
import Img from '../Img/Img'

export default function ProcessAttributeZeroState(props) {
	return (
		<div style={{marginTop: '0px'}} onClick={() => window.location = 'https://polymer.helpscoutdocs.com/'}>
			<Img useExtension src='attribute-zero-state.svg' />
		</div>
	)
}