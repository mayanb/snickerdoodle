import React from 'react'
import AccountSectionHeader from './AccountSectionHeader'
import Card from '../Card/Card'
import Img from '../Img/Img'

export default function FactoryOptions({ taskLabelType, onSubmit }) {
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
					</div>
				</Card>
			</div>
	)
}

function SelectableLabelImages({ taskLabelType, onSubmit }) {
	const labelImages = ['goal-setting', 'goal-setting', 'goal-setting']
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

