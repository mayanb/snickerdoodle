import React from 'react'
import Button from '../Button/Button'
import { Checkbox } from 'antd'
import ProcessAttributeField from './ProcessAttributeField'
import ElementCard from '../Element/ElementCard'

export default class ProcessAttributeNew extends React.Component {
	constructor(props) {
		super()
		this.state = {
			name: "",
			type: null,
			is_recurrent: false,
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this)
	}

	render() {
		let { name, type } = this.state
		let { isLoading } = this.props
		return (
			<ElementCard selected className="process-attribute-new" index={0} handle>
				<div className="process-attr-inputs">
					<ProcessAttributeField edit
						name="Name" 
						value={name} 
						onChange={(e) => this.handleChange("name", e.target.value)}
					/>
					<ProcessAttributeField edit select 
						name="Type" 
						value={type}
						onChange={(e) => this.handleChange("type", e)}
					/>
				</div>
				<div className="recurrent-checkbox">
					<Checkbox onChange={this.handleCheckBoxChange}>Attribute records multiple values (e.g. temperature every hour) </Checkbox>
				</div>
				<Button 
					wide
					isLoading={isLoading} 
					onClick={this.handleSubmit}
					type={!this.stateIsValid() && 'disabled'}
				>
					Save
				</Button>
			</ElementCard>
		)
	}
	
	handleCheckBoxChange(e) {
		this.setState({ is_recurrent: e.target.checked })
	}

	handleChange(field, value) {
		this.setState({ [field] : value })
	}

	stateIsValid() {
		let { name, type } = this.state
		return (type && name.trim().length > 0)
	}

	handleSubmit() {
		let { name, type } = this.state
		if(this.stateIsValid()) {
			this.props.onSubmit(name, type.value)
		}
	}
}