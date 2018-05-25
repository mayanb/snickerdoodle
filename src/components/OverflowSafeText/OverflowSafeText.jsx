import React from 'react'
import { Tooltip } from 'antd'
import './styles/overflowsafetext.css'

export default function OverflowSafeText({className, tooltipText, children}) {
	return (
		<div className={`overflow-safe-text ${className}`}>
				<Tooltip title={tooltipText || children}>
					<span className='text-content'>{children}</span>
				</Tooltip>
		</div>
	)
}