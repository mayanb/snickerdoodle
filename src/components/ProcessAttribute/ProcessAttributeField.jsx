import React from 'react'
import Switch from '../Switch/Switch'
import ProcessAttributeDatatype from './ProcessAttributeDatatype'
import Select2 from '../Inputs/Select'
import Input from '../Inputs/Input'
import FormGroup from '../Inputs/FormGroup'

export default function ProcessAttributeField(props) {
	return (
		<div className="process-attribute-field">
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
	return(
		<div>
			<FormGroup>
			<Input
			type="text"
			placeholder="eg. Temperature"
			value={props.value}
			onChange={props.onChange}
			/>
			</FormGroup>
		</div>
	)
}

export function EditSelect(props) {

	let selectOptions = [{value: "TEXT", name: "Text"}, {value: "NUMB", name: "Number"}, {value: "TIME", name: "Time"}, {value: "USER", name: "User"}]
	return (
		<div className='process-attribute-select'>
		<FormGroup>
		<Select2
			openOnFocus
			value={props.value}
			searchable={false}
			clearable={false}
			options={selectOptions}
			labelKey={'name'}
			valueKey={'value'}
			placeholder="Select a datatype"
			onChange={props.onChange}
		/>
		</FormGroup>
		</div>

	)

}