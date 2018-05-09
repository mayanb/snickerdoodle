import React from 'react'
import {pluralize} from '../../utilities/stringutils'
import ProcessPageEditForm from './ProcessPageEditForm'
import ProcessEditForm from "./ProcessEditForm"
import { ElementTitle } from '../Element/Element'
import { Modal } from 'antd'

const { confirm } = Modal

export default class ProcessInformation extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			isEditing: false,
			...props.process,
		}
		this.handleToggleEditing = this.handleToggleEditing.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	render() {
		const { isEditing } = this.state
		const { process, onArchive, onDuplicate, isSavingEdit } = this.props
		const { icon, code, name } = process
		return (
			<div className="process-information">
				<ElementTitle
					icon={icon}
					text={`(${code}) ${name}`}
					buttonTitle={this.state.isEditing ? 'Cancel' : 'Edit'}
					onClick={this.handleToggleEditing}
					isLoading={isSavingEdit}
				/>
				<div className="process-basic-information-container">
				{ isEditing ? 
					<ProcessEditForm onChange={this.handleChange} onSubmit={this.handleSubmit} {...this.state} isLoading={isSavingEdit} /> :
					<ProcessBasicInformation { ...process } />
				}
				</div>
				<ProcessPageEditForm onArchive={onArchive} onDuplicate={onDuplicate}/>
			</div>
		)
	}

	handleToggleEditing() {
		this.setState({ isEditing: !this.state.isEditing })
	}

	handleChange(e, type) {
		let key = type
		this.setState({ [key] : e.target.value })
	}
	
	handleConfirmSubmit(newData) {
		confirm({
			title: `Are you sure you want to update ${this.props.process.name} (${this.props.process.code})?`,
			content: "Existing tasks of this process type will also be affected. This may create inconsistencies.\nIf you're not sure, try deleting this process and making a new one with the updates.",
			okText: 'Yes, I\'m sure',
			okType: 'danger',
			onOk: () =>  this.props.onSubmitChange(newData).then(() => this.setState({ isEditing: false})),
			onCancel: () => {}
		})
	}
	
	
	handleSubmit() {
		if (this.state.isSavingEdit) {
			return 
		}
		let { name, code, output_desc, default_amount, unit } = this.state
		this.handleConfirmSubmit({
			name: name, 
			code: code, 
			output_desc: output_desc, 
			default_amount: default_amount, 
			unit: unit
		})
	}
}

function ProcessBasicInformation({ code, name, output_desc, default_amount, unit}) {
	let defaultAmount = parseFloat(default_amount)
	return (
		<div className="process-information-basic">
			<div className="piece-of-info">
				<span>Batch Size</span>
				<span className="emphasis">{defaultAmount.toLocaleString()} {pluralize(defaultAmount, unit)}</span>
			</div>
			<div className="piece-of-info">
				<span>Output Description</span>
				<span className={output_desc ? 'emphasis' : 'no-description'}>{output_desc || "No description"}</span>
			</div>
		</div>
	)
}