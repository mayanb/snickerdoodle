import React from 'react'
import FormGroup from '../Inputs/FormGroup'
import Button from '../Button/Button'
import Input from '../Inputs/Input'
import Img, { ic, getSrcImg } from '../Img/Img'
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import './styles/processeditform.css'

export default function EditProcessInfoForm({ icon, code, name, output_desc, default_amount, unit, isLoading, onChange, onSubmit}) {
	return (
		<div className='edit-process-info'>
			<IconPicker onChange={onChange} icon={icon} />
			<CodeAndName onChange={onChange} name={name} code={code}/>
			<OutputDescription onChange={onChange} output_desc={output_desc} />
			<OutputQuantity onChange={onChange} default_amount={default_amount} unit={unit}/>
			<FormGroup>
				<Button wide onClick={onSubmit} isLoading={isLoading}>Save changes</Button>
			</FormGroup>
		</div>
	)
}

class IconPicker extends React.Component {
	constructor(props) {
		super(props)
		this.state = { isSelectingIcon: false }
		this.togglePicker = this.togglePicker.bind(this)
	}
	
	render() {
		const { onChange, icon } = this.props
		const { isSelectingIcon } = this.state
		
		const customEmojis = [
			{
				name: 'Temper',
				short_names: ['temper'],
				text: '',
				emoticons: [],
				keywords: ['tempter'],
				imageUrl: getSrcImg('ballmill@3x') //'/img/ballmill@3x.png'
			},
		]
		return (
				<FormGroup label="icon-picker" className="icon-picker-group">
					<Img src={ic(icon || 'default.png')} height="30px" />
					<Button isLoading={false} onClick={this.togglePicker}>Select a process icon</Button>
					{isSelectingIcon && (
						<Picker
							custom={customEmojis}
							// backgroundImageFn={(set, sheetSize) => `/img/ballmill@3x.png`}
						/>)}
				</FormGroup>
		)
	}
	
	togglePicker() {
		this.setState({ isSelectingIcon: !this.state.isSelectingIcon })
	}
}

function CodeAndName({ onChange, name, code }) {
	return (
		<div className="name-abbreviation">
			<FormGroup label="Code" className="abbreviation-group">
				<Input
					type="text"
					className="abbreviation"
					value={code}
					onChange={(e) => onChange(e.target.value, "code")}
				/>
			</FormGroup>
			<FormGroup label="Name" className="name-group">
				<Input
					type="text"
					className="name"
					value={name}
					onChange={(e) => onChange(e.target.value, "name")}
				/>
			</FormGroup>
		</div>
	)
}

function OutputDescription({ onChange, output_desc }) {
	return (
			<FormGroup label="Description">
				<Input
					type="text"
					placeholder="Roasted Beans"
					value={output_desc}
					onChange={(e) => onChange(e.target.value, "output_desc")}
				/>
			</FormGroup>
	)
}

function OutputQuantity({ onChange, default_amount, unit }) {
	return (
		<FormGroup label="Default Batch Size">
			<div className="output-quantity">
				<Input
					type="number"
					className="number"
					placeholder="5"
					value={default_amount}
					onChange={(e) => onChange(e.target.value, "default_amount")}
				/>
				<Input
					type="text"
					className="unit"
					placeholder="kilograms"
					value={unit}
					onChange={(e) => onChange(e.target.value, "unit")}
				/>
			</div>
		</FormGroup>
	)
}
