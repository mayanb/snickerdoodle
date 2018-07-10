import React from 'react'
import {pluralize} from '../../utilities/stringutils'
import ProcessPageEditForm from './ProcessPageEditForm'
import ProcessEditForm from "./ProcessEditForm"
import { ElementTitle } from '../Element/Element'
import {categoryColor, categoryName} from '../../utilities/processutils'
import { Modal, Tag } from 'antd'

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
		const { icon, code, name, category } = process
		const category_name = categoryName(category)
		const category_color = categoryColor(category)
		return (
			<div className="process-information">
				<ElementTitle
					icon={icon}
					text={`(${code}) ${name}`}
					buttonTitle={this.state.isEditing ? 'Cancel' : 'Edit'}
					onClick={this.handleToggleEditing}
					isLoading={isSavingEdit}
					height="58px"
				>
		 		<Tag color={category_color} style={{margin:'5px', textAlign:"left", fontSize:'11px'}}>{category_name}</Tag>
				</ElementTitle>
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

	handleChange(value, type) {
		this.setState({ [type] : value })
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
		let { icon, name, code, output_desc, default_amount, unit } = this.state
		const updatedProcessInfo = {
			icon: icon,
			name: name,
			code: code,
			output_desc: output_desc,
			default_amount: default_amount,
			unit: unit
		}
		this.handleConfirmSubmit(updatedProcessInfo)
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