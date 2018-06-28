import React from 'react'
import { Checkbox } from 'antd'

export default function Submissions({checked, onChange}) {
	return (
		<div className="recurrent-checkbox">
			<Checkbox checked={checked} onChange={onChange}>Attribute records multiple values (e.g. temperature every hour) </Checkbox>
		</div>
	)
}
