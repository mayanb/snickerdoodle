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
		this.handleSelectIcon = this.handleSelectIcon.bind(this)
	}
	
	render() {
		const { icon } = this.props
		const { isSelectingIcon } = this.state
		console.log('icon in render()', icon)
		return (
				<FormGroup label="icon-picker" className="icon-picker-group">
					<Img src={ic(icon || 'default.png')} height="30px" />
					<Button isLoading={false} onClick={this.togglePicker}>Select a process icon</Button>
					{isSelectingIcon && (
						<Picker
							custom={this.getIconData()}
							include={['custom']}
							onSelect={this.handleSelectIcon}
						/>)}
				</FormGroup>
		)
	}
	
	togglePicker() {
		this.setState({ isSelectingIcon: !this.state.isSelectingIcon })
	}
	
	getIconData() {
		const iconNames = ['DS@3x.png', 'UBS@3x.png', 'prep@3x.png', 'breakandwinnow@3x.png', 'ingredient@3x.png', 'winnow@3x.png', 'nibspack@3x.png', 'prerefine@3x.png', 'label@3x.png', 'group@3x.png', 'cook@3x.png', 'pack@3x.png', 'rotaryconche@3x.png', 'pasteurize@3x.png', 'package@3x.png', 'ballmill@3x.png', 'gami@3x.png', 'default@3x.png', 'roast@3x.png', 'sample@3x.png', 'lid@3x.png', 'hold@3x.png', 'unfoiledbarsample@3x.png', 'rotaryconchepull@3x.png', 'box@3x.png', 'conche@3x.png', 'grind@3x.png', 'nibstore@3x.png', 'samplebarfoil@3x.png', 'temper@3x.png', 'melangerpull@3x.png', 'melange@3x.png', 'ship@3x.png', 'foil@3x.png', 'jar@3x.png']
		const iconData = []
		iconNames.forEach(name => {
			const display_name = name.split('@3x.png')[0]
			const icon_file_name = name.split('.png')[0]
			const icon = {
				'name': display_name,
				'short_names': [display_name],
				'text': '',
				'emoticons': [],
				'keywords': [display_name],
				'imageUrl': getSrcImg(icon_file_name)
			}
			iconData.push(icon)
		})
		return iconData
	}
	
	handleSelectIcon(icon) {
		this.togglePicker()
		this.props.onChange(icon.imageUrl.split('img/')[1].replace('@3x', ''), 'icon')
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
