import React from 'react'
import Img from '../Img/Img'
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import './styles/iconpicker.css'
import { Dropdown, Menu } from 'antd'
import { ICONS } from '../../utilities/constants'
import { getProcessIcon } from '../../utilities/stringutils'

// NOTE: icons with names like 'ship' that match emojis get replaced with the emoji,
// so '&' is just noise that prevents that. #hacky
const ANTI_EMOJI_TAG = '&'

export default class IconPicker extends React.Component {
	constructor(props) {
		super(props)
		this.handleSelectIcon = this.handleSelectIcon.bind(this)
	}
	
	render() {
		const { icon } = this.props
		return (
			<div className="process-icon-picker-wrapper">
				<Dropdown overlay={this.renderPickerInMenu()} trigger={['click']}>
					<div className="process-icon-picker" onClick={this.togglePicker}>
						<Img src={getProcessIcon(icon || 'default.png')} height="30px" className="icon"/>
						<i className='material-icons change-icon-icon'>loop</i>
					</div>
	    	</Dropdown>
			</div>
		)
	}

	renderPickerInMenu() {
		let icons = this.getIconData()
		let height = Math.ceil(icons.length/6) * 36 + 16
		return (
			<Menu>
				<div className="picker-inner" style={{maxHeight: height+'px', overflow:'hidden'}}>
					<Picker
						title="Select a process icon"
						autoFocus={true}
						native={false}
						perLine={6}
						custom={icons}
						include={['custom']}
						exclude={this.excludeAllEmojis()}
						onClick={this.handleSelectIcon}
						i18n={this.getI18N()}
					/>
				</div>
			</Menu>
		)
	}
	
	getIconData() {
		function getProcessIconSrcImg(src) {
			return `${process.env.PUBLIC_URL}/img/process-icons/${src}`
		}
		const iconData = []
		ICONS.forEach(name => {
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
		this.props.onChange(`${icon.id.replace(ANTI_EMOJI_TAG, '')}.png`, 'icon')
	}
}
