import React from 'react'
import Button from '../Card/Button'

export class ProcessAttribute extends React.Component {

	render() {
		let props = this.props

		return (
			<div className={"process-attribute " + (props.newAttribute?"new-attribute":"")}>
				<div className="process-attribute-move">
					<i className="material-icons">drag_handle</i>
				</div>
				<div className="process-attribute-name">
					<span>{props.name}</span>
				</div>
				<div className="process-attribute-type">
					<span>{props.datatype}</span>
				</div>
				<div className="process-attribute-more" onClick={props.newAttribute?()=>null:props.onArchive} >
					<i className="material-icons">delete</i>
				</div>
			</div>
		)
	}
}

export class ProcessAttributeCreator extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			name: "",
			type: ""
		}

		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleChange(key, value) {
		this.setState({[key]: value})
	}

	handleSubmit() {
		this.props.onSubmit(this.state.name, this.state.type)
	}


	render() {
		let props = this.props

		return (
			<div className="process-attribute-creator">
				<div className="process-attribute">
					<div className="process-attribute-move" />
					<div className="process-attribute-name">
						<input 
							type="text" 
							placeholder="Attribute name" 
							style={{width: "100%", marginRight: "16px"}} 
							value={this.state.name} 
							onChange={(e) => this.handleChange("name", e.target.value)}
						/>
					</div>
					<div className="process-attribute-type">
						<input 
							type="select" 
							placeholder="Text"
							value={this.state.type} 
							onChange={(e) => this.handleChange("type", e.target.value)}
						/>
					</div>
					<div className="process-attribute-more" />
				</div>

				<div className="attribute-buttons">
					<Button secondary onClick={this.props.onCancel}>Cancel</Button>
					<Button onClick={this.handleSubmit}>Save</Button>
				</div>
			</div>
		)
	}
}