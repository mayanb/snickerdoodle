import React from 'react'
import Img from '../Img/Img'

const DEFAULT_ICON = '/img/default@3x.png'

export default function InventoryIcon({icon, innerSize=16, outerSize=24}) {
	return (
		<div className="inv-icon-circ" style={{height: outerSize+'px', width: outerSize+'px'}}>
			<Img 
				height={innerSize}
				src={icon.substring(0, icon.length - 4) + "@3x"} 
				onError={e => e.target.src = DEFAULT_ICON}
			/>
		</div>
	)
}