import React from 'react'
import { Tooltip } from 'antd'
import './styles/overflowsafetext.css'

export default function OverflowSafeText({className, children}) {
	return (
		<div className={`overflow-safe-text ${className}`}>
				<Tooltip title={children}>
					<span className='text-content'>{children}</span>
				</Tooltip>
		</div>
	)
}