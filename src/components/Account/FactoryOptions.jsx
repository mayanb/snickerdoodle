import React from 'react'
import AccountSectionHeader from './AccountSectionHeader'
import Card from '../Card/Card'
import Img from '../Img/Img'


export default function FactoryOptions({ taskLabelType }) {
	return (
			<div className="factory-options">
				<AccountSectionHeader title="Factory Options" />
				<LabelOptions taskLabelType={taskLabelType}/>
			</div>
	)
}

function LabelOptions({ taskLabelType }) {
	return (
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
				<SelectableLabelImages taskLabelType={taskLabelType}/>
			</div>
		</Card>
	)
}

function SelectableLabelImages({ taskLabelType }) {
	const labelImages = ['goal-setting', 'goal-setting', 'goal-setting']
	console.log(taskLabelType)
	return (
		<div className="selectable-label-images">
			{labelImages.map((img, i) =>
				<div key={i} className={`label-image ${taskLabelType === i ? 'selected' : ''}`}>
					<Img src={img} className="icon"/>
				</div>
			)}
		</div>
	)
}