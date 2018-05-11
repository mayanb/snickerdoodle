import React from 'react'
import FormGroup from '../Inputs/FormGroup'
import Button from '../Button/Button'
import Img, { ic, getSrcImg } from '../Img/Img'
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import './styles/iconpicker.css'

export default class IconPicker extends React.Component {
	constructor(props) {
		super(props)
		this.state = { isSelectingIcon: false }
		this.togglePicker = this.togglePicker.bind(this)
		this.handleSelectIcon = this.handleSelectIcon.bind(this)
	}
	
	render() {
		const { icon } = this.props
		const { isSelectingIcon } = this.state
		return (
			<div className="process-icon-picker">
				<FormGroup label="Icon" className="process-icon-picker-group">
					<Img src={ic(icon || 'default.png')} height="30px" className="icon"/>
				</FormGroup>
				<FormGroup>
					<Button isLoading={false} onClick={this.togglePicker} wide={true}>
						{isSelectingIcon ? 'Cancel' : 'Change icon'}
					</Button>
				</FormGroup>
				
				{isSelectingIcon && (
					<div className="picker-wrapper">
						<Picker
							title="Select a process icon"
							autoFocus={true}
							native={false}
							perLine={6}
							custom={this.getIconData()}
							include={['custom']}
							onClick={this.handleSelectIcon}
							i18n={this.getI18N()}
						/>
					</div>)}
			</div>
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
				'imageUrl': getSrcImg(icon_file_name),
			}
			iconData.push(icon)
		})
		return iconData
	}
	
	getI18N() {
		return {
			search: 'Search',
			notfound: 'No Icon Found',
			categories: {
				custom: 'Custom',
			}
		}
	}
	
	handleSelectIcon(icon) {
		this.togglePicker()
		this.props.onChange(`${icon.id}.png`, 'icon')
	}
}
