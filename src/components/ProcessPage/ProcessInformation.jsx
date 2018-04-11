import React from 'react'
import {pluralize} from '../../utilities/stringutils'
import Img from '../Img/Img'
import Button from '../Button/Button'
import ProcessPageEditForm from './ProcessPageEditForm'
import EditProcessInfoForm from "../Processes/EditProcessInfoForm";

export default function ProcessInformation({icon, code, name, output_desc, default_amount, unit, onArchive, onDuplicate, editingBasicInfoOpen, onSubmitBasicInfo, onInputChange}) {
	console.log('code, name', code, name)
	return (
		<div className="process-information">
			<ProcessInformationHeader
				icon={icon}
				code={code}
				name={name}
				editingBasicInfoOpen={editingBasicInfoOpen}
				onSubmitBasicInfo={onSubmitBasicInfo}/>
			<ProcessBasicInformation
				code={code}
				name={name}
				output_desc={output_desc}
				default_amount={default_amount}
				unit={unit}
				onInputChange={onInputChange}
				editingBasicInfoOpen={editingBasicInfoOpen}/>
			<ProcessPageEditForm onArchive={onArchive} onDuplicate={onDuplicate}/>
		</div>
	)
}

function ProcessInformationHeader({icon, code, name, editingBasicInfoOpen, onSubmitBasicInfo}) {
	return (
		<div className="process-information-header">
			<div className="process-name">
				{/*<Img src={ic(icon)} height="30px" />*/}
				<span>{`(${code}) ${name}`}</span>
			</div>
			<Button type={editingBasicInfoOpen ? 'blue' : 'gray'} onClick={onSubmitBasicInfo}>{editingBasicInfoOpen ? 'Save' : 'Edit'}</Button>
		</div>
	)
}

function ic(icon) {
	return icon.substring(0, icon.length - 4) + "@3x"
}

function ProcessBasicInformation({ code, name, output_desc, default_amount, unit, onInputChange, editingBasicInfoOpen}) {
	let defaultAmount = parseFloat(default_amount)
	if (editingBasicInfoOpen) {
		return <EditProcessInfoForm
			code={code}
			name={name}
			output_desc={output_desc}
			default_amount={defaultAmount}
			unit={unit}
			onInputChange={onInputChange}
			editingBasicInfoOpen={editingBasicInfoOpen}
		/>
	}
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