import React from 'react'
import AccountSectionHeader from './AccountSectionHeader'
import Card from '../Card/Card'
import Img from '../Img/Img'
import { Switch } from 'antd';

export default function FactoryOptions({ taskLabelType, onSubmit, teamInfo, onClick}) {
	return (
			<div className="factory-options">
				<AccountSectionHeader title="Factory Options" />
				<Card>
					<div className="account-integration">
						<div className="integration-info">
							<div>
								<span>Printed Label Style</span>
							</div>
						</div>
						<div className="integration-detail">
							<span>Click to select the style of label you'd like printed whenever tasks labels are printed on the mobile app.</span>
						</div>
						<SelectableLabelImages taskLabelType={taskLabelType} onSubmit={onSubmit}/>
						<div className="integration-info">
							<div>
								<span>Set Time Format</span>
							</div>
						</div>
						<RenderTimeFormatSwitch teamInfo={teamInfo} onClick={onClick}/>
					</div>
				</Card>
			</div>
	)
}

function RenderTimeFormatSwitch({teamInfo, onClick}) {
	let time_format
	if(teamInfo === 'm') 
		time_format = false
	else
		time_format = true
	return (
		<div>
			<span className="integration-detail"> Use 12 hour time format </span>				
			<Switch 
				defaultChecked = {time_format}
				onClick = {() => onClick()}
			/>
		</div>
	)
}

function SelectableLabelImages({ taskLabelType, onSubmit }) {
	const labelImages = ['task-label-type-0', 'task-label-type-1', 'task-label-type-2']
	return (
		<div className="selectable-label-images">
			{labelImages.map((img, i) =>
				<div
					key={i}
					className={`label-image ${taskLabelType === i ? 'selected' : ''}`}
					onClick={() => onSubmit('task_label_type', i)}
				>
					<Img src={img} className="icon"/>
				</div>
			)}
		</div>
	)
}

