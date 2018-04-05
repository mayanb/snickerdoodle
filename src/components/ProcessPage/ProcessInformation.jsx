import React from 'react'
import {pluralize} from '../../utilities/stringutils'
import Img from '../Img/Img'
import Button from '../Button/Button'
import ProcessPageEditForm from './ProcessPageEditForm'

export default function ProcessInformation({icon, code, name, description, default_amount, unit, onArchive, onDuplicate, isEditingBasicInfo, onSubmitBasicInfo}) {
	return (
		<div className="process-information">
			<ProcessInformationHeader icon={icon} code={code} name={name} isEditingBasicInfo={isEditingBasicInfo} onSubmitBasicInfo={onSubmitBasicInfo}/>
			<ProcessBasicInformation description={description} batchSize={default_amount} unit={unit} isEditingBasicInfo={isEditingBasicInfo}/>
			<ProcessPageEditForm onArchive={onArchive} onDuplicate={onDuplicate}/>
		</div>
	)
}

function ProcessInformationHeader({icon, code, name, isEditingBasicInfo, onSubmitBasicInfo}) {
	return (
		<div className="process-information-header">
			<div className="process-name">
				<Img src={ic(icon)} height="30px" />
				<span>{`(${code}) ${name}`}</span>
			</div>
			<Button type="gray" onClick={onSubmitBasicInfo}>{isEditingBasicInfo ? 'Save' : 'Edit'}</Button>
		</div>
	)
}

function ic(icon) {
	return icon.substring(0, icon.length - 4) + "@3x"
}

function ProcessBasicInformation({description, batchSize, unit, isEditingBasicInfo}) {
	let b = parseFloat(batchSize)
	if (isEditingBasicInfo) {
		return <EditProcessBasicInformation description={description} batchSize={b} unit={unit}/>
	}
	return (
		<div className="process-information-basic">
			<div className="piece-of-info">
				<span>Batch Size</span>
				<span className="emphasis">{b.toLocaleString()} {pluralize(b, unit)}</span>
			</div>
			<div className="piece-of-info">
				<span>Description</span>
				<span className="no-description">{description || "No description"}</span>
			</div>
		</div>
	)
}

function EditProcessBasicInformation({description, batchSize, unit}) {
	let b = parseFloat(batchSize)
	return (
		<div className="process-information-basic">
			<div className="piece-of-info">
				<span>EDIT: Batch Size</span>
				<span className="emphasis">{b.toLocaleString()} {pluralize(b, unit)}</span>
			</div>
			<div className="piece-of-info">
				<span>EDIT: Description</span>
				<span className="no-description">{description || "No description"}</span>
			</div>
		</div>
	)
}