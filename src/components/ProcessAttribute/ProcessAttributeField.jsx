import React from 'react'
import Switch from '../Switch/Switch'
import ProcessAttributeDatatype from './ProcessAttributeDatatype'
import Select2 from '../Inputs/Select'
import Input from '../Inputs/Input'
import FormGroup from '../Inputs/FormGroup'
import { ATTRIBUTE_TYPES } from '../../utilities/constants'

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

class EditText extends React.Component {
	constructor(props) {
		super(props)
		this.inputRef = null
	}

	componentDidMount() {
		if (this.inputRef) {
			this.inputRef.focus()
		}
	}

	render() {
		let { value, onChange } = this.props
		return(
			<div>
				<FormGroup>
				<Input
					type="text"
					placeholder="eg. Temperature"
					value={value}
					onChange={onChange}
					ref={(e) => this.inputRef = e } 
				/>
				</FormGroup>
			</div>
		)
	}
}

export function EditSelect(props) {

	return (
		<div className='process-attribute-select'>
		<FormGroup>
		<Select2
			openOnFocus
			value={props.value}
			searchable={false}
			clearable={false}
			options={ATTRIBUTE_TYPES}
			labelKey={'label'}
			valueKey={'value'}
			placeholder="Select a datatype"
			onChange={props.onChange}
		/>
		</FormGroup>
		</div>

	)

}