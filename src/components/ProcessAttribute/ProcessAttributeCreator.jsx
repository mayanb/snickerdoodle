import React from 'react'
import ProcessAttribute from './ProcessAttribute'

export default class ProcessAttributeCreator extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			name: "",
			datatype: "", 
			required: false,
		}

		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleChange(key, value) {
		let k = key.toLowerCase()
		this.setState({[k]: value})
	}

	handleSubmit() {
		this.props.onSubmit(this.state.name, this.state.datatype)
	}

	render() {
		return (
			<ProcessAttribute edit 
				name={this.state.name} 
				datatype={this.state.datatype} 
				required={this.state.required}
				onChange={this.handleChange.bind(this)} 
				onSubmit={this.handleSubmit}
				onCancel={this.props.onCancel}
			/>
		)
	}


	// render() {
	// 	let props = this.props

	// 	return (
	// 		<div className="process-attribute-creator">
	// 			<div className="process-attribute">
	// 				<div className="process-attribute-move" />
	// 				<div className="process-attribute-name">
	// 					<input 
	// 						type="text" 
	// 						placeholder="Attribute name" 
	// 						style={{width: "100%", marginRight: "16px"}} 
	// 						value={this.state.name} 
	// 						onChange={(e) => this.handleChange("name", e.target.value)}
	// 					/>
	// 				</div>
	// 				<div className="process-attribute-type">
						
	// 				</div>
	// 				<div className="process-attribute-more" />
	// 			</div>

	// 			<div className="attribute-buttons">
	// 				<Button secondary onClick={this.props.onCancel}>Cancel</Button>
	// 				<Button onClick={this.handleSubmit}>Save</Button>
	// 			</div>
	// 		</div>
	// 	)
	// }
}