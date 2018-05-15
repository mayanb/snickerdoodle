import React from 'react'
import Img, { ic, getProcessIconSrcImg } from '../Img/Img'
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import './styles/iconpicker.css'

// NOTE: icons with names like 'ship' that match emojis get replaced with the emoji,
// so '&' is just noise that prevents that. #hacky
const ANTI_EMOJI_TAG = '&'

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
			<div className="process-icon-picker-wrapper">
				<div className="process-icon-picker" onClick={this.togglePicker}>
					<Img src={ic(icon || 'default.png')} height="30px" className="icon"/>
					<i className={`material-icons change-icon-icon ${isSelectingIcon ? 'close' : 'loop'}`}>
						{isSelectingIcon ? 'close' : 'loop'}
					</i>
				</div>
				{isSelectingIcon && (
					<div className="picker-wrapper">
						<Picker
							title="Select a process icon"
							autoFocus={true}
							native={false}
							perLine={6}
							custom={this.getIconData()}
							include={['custom']}
							exclude={this.excludeAllEmojis()}
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
		const iconNames = ['prep-process-icon@3x.png', 'breakandwinnow-process-icon@3x.png', 'ingredient-process-icon@3x.png', 'prerefine-process-icon@3x.png', 'label-process-icon@3x.png', 'pack-process-icon@3x.png', 'pasteurize-process-icon@3x.png', 'package-process-icon@3x.png', 'ballmill-process-icon@3x.png', 'default-process-icon@3x.png', 'roast-process-icon@3x.png', 'lid-process-icon@3x.png', 'hold-process-icon@3x.png', 'rotaryconchepull-process-icon@3x.png', 'box-process-icon@3x.png', 'conche-process-icon@3x.png', 'grind-process-icon@3x.png', 'temper-process-icon@3x.png', 'melangerpull-process-icon@3x.png', 'melange-process-icon@3x.png', 'ship-process-icon@3x.png', 'foil-process-icon@3x.png', 'jar-process-icon@3x.png']
		const iconData = []
		iconNames.forEach(name => {
			const display_name = name.split('-process-icon@3x.png')[0] + ANTI_EMOJI_TAG
			const icon = {
				'name': display_name,
				'short_names': [display_name],
				'text': '',
				'emoticons': [],
				'keywords': [display_name],
				'imageUrl': getProcessIconSrcImg(name),
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
	
	excludeAllEmojis() {
		return [
			'search',
			'recent',
			'people',
			'nature',
			'foods',
			'activity',
			'places',
			'objects',
			'symbols',
			'flags',
		]
	}
	
	handleSelectIcon(icon) {
		this.togglePicker()
		this.props.onChange(`${icon.id.replace(ANTI_EMOJI_TAG, '')}.png`, 'icon')
	}
}
