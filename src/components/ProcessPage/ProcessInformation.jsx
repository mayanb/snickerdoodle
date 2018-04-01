import React from 'react'
import {pluralize} from '../../utilities/stringutils'
import Img from '../Img/Img'
import Button from '../Button/Button'
import ProcessPageEditForm from './ProcessPageEditForm'

export default function ProcessInformation({icon, code, name, description, default_amount, unit, onArchive, onDuplicate}) {
	return (
		<div className="process-information">
			<ProcessInformationHeader icon={icon} code={code} name={name} />
			<ProcessBasicInformation description={description} batchSize={default_amount} unit={unit}/>
			<ProcessPageEditForm onArchive={onArchive} onDuplicate={onDuplicate}/>
		</div>
	)
}

function ProcessInformationHeader({icon, code, name}) {
	return (
		<div className="process-information-header">
			<Img src={ic(icon)} height="30px" />
			<span>{`(${code}) ${name}`}</span>
			<Button type="gray">Edit</Button>
		</div>
	)
}

function ic(icon) {
	return icon.substring(0, icon.length - 4) + "@3x"
}

function ProcessBasicInformation({description, batchSize, unit}) {
	let b = parseFloat(batchSize)
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