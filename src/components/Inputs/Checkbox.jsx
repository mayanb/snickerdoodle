import React from 'react'
import './styles/checkbox.css'

export default function Checkbox({ label, onChange, checked }) {
	return (
		<div className="checkbox">
			<label>
				<input checked={checked} type="checkbox"  onChange={onChange}/>
				{label}
			</label>
		</div>
	)
}
