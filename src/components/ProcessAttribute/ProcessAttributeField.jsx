import React from 'react'
import Switch from '../Switch/Switch'
import ProcessAttributeDatatype from './ProcessAttributeDatatype'

export default function ProcessAttributeField(props) {
	return (
		<div className="process-attribute-field">
			<span className={props.edit?"edit":""}>{props.name}</span>
			<ProcessAttributeFieldValue {...props} />
		</div>
	)
}

function ProcessAttributeFieldValue(props) {
	if (props.switch) {
		return <Switch {...props} />
	} else if (props.select) {
		if (props.edit) {
			return <EditSelect {...props} />
		}
		return <Select {...props} />
	} else {
		if (props.edit) {
			return <EditText {...props} />
		}
		return <Text {...props} />
	}
}

function Select(props) {
	return <ProcessAttributeDatatype type={props.value} />
}

function Text(props) {
	return <span style={{fontWeight: props.main?"700":"300"}}>{props.value}</span>
}

function EditText(props) {
	return (
		<div>
			<input type="text" placeholder="eg. Temperature" value={props.value} onChange={(e) => props.onChange(props.name, e.target.value)} />
		</div>
	)
}

function EditSelect(props) {
	return (
		<div>
			<select value={props.value} onChange={(e) => props.onChange(props.name, e.target.value)}>
				<option value="TEXT">Text</option>
				<option value="NUMBER">Number</option>
				<option value="USER">User</option>
			</select>
		</div>
	)

}