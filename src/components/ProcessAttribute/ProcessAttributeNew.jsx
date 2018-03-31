import React from 'react'
import Button from '../Button/Button'
import ProcessAttributeField from './ProcessAttributeField'
import Wrapper from './ProcessAttributeWrapper'

export default class ProcessAttributeNew extends React.Component {
	constructor(props) {
		super()
		this.state = {
			name: "",
			type: null,
		}
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	render() {
		let { name, type } = this.state
		let { isLoading } = this.props
		return (
			<Wrapper className="process-attribute-new" index={0}>
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
				<Button 
					isLoading={isLoading} 
					onClick={this.handleSubmit}
					type={!this.stateIsValid() && 'disabled'}
				>
					Save
				</Button>
			</Wrapper>
		)
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