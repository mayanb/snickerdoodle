import React from 'react'
import { Tooltip } from 'antd'

export default function OverflowSafeText({className, children}) {
	return (
		<div className={`overflow-safe-text ${className}`}>
			<Tooltip title={children}>
				{children}
				{/*<span>{children}</span>*/}
			</Tooltip>
		</div>
	)
}