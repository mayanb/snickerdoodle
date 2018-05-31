import React from 'react'
import AccountSectionHeader from './AccountSectionHeader'
import Card from '../Card/Card'
import Img from '../Img/Img'


export default class FactoryOptions extends React.Component {
	render() {
		return (
			<div className="factory-options">
				<AccountSectionHeader title="Factory Options" />
				<LabelOptions />
			</div>
		)
	}
}

function LabelOptions(props) {
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
				<SelectableLabelImages/>
			</div>
		</Card>
	)
}

function SelectableLabelImages(props) {
	const labelImages = ['goal-setting', 'goal-setting', 'goal-setting']
	return (
		<div className="selectable-label-images">
			{labelImages.map(img =>
				<div className="label-image">
					<Img src={img} height="52px" className="icon"/>
				</div>
			)}
		</div>
	)
}