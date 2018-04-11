import React from 'react'
import {pluralize} from '../../utilities/stringutils'
import Img from '../Img/Img'
import Button from '../Button/Button'
import ProcessPageEditForm from './ProcessPageEditForm'
import ProcessEditForm from "./ProcessEditForm";

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
				<ProcessInformationHeader
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

	handleSubmit() {
		if (this.state.isSavingEdit) {
			return 
		}
		let { name, code, output_desc, default_amount, unit } = this.state
		this.props.onChange({
			name: name, 
			code: code, 
			output_desc: output_desc, 
			default_amount: default_amount, 
			unit: unit
		}).then(() => this.setState({ isEditing: false }))
	}
}

function ProcessInformationHeader({icon, text, buttonTitle, onClick, isLoading}) {
	return (
		<div className="process-information-header">
			<div className="process-name">
				<Img src={ic(icon)} height="30px" />
				<span>{text}</span>
			</div>
			<Button type='gray' isLoading={isLoading} onClick={onClick}>{buttonTitle}</Button>
		</div>
	)
}

function ic(icon) {
	return icon.substring(0, icon.length - 4) + "@3x"
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