import React from 'react'
import Img from '../Img/Img'

export default function InventoryIcon({icon, innerSize=16, outerSize=24}) {
	return (
		<div className="inv-icon-circ" style={{height: outerSize+'px', width: outerSize+'px'}}>
			<Img 
				height={innerSize}
				src={icon.substring(0, icon.length - 4) + "@3x"} 
			/>
		</div>
	)
}