import React from 'react'
import ApplicationSectionHeader from '../Application/ApplicationSectionHeader'
import Img from '../Img/Img'
import { getProcessIcon } from '../../utilities/stringutils'
import Button from '../Button/Button'
import './styles/element.css'

export function ElementHeader({ title, name, onBack }) {
	return (
		<ApplicationSectionHeader>
			<div className="element-header">
				<i className="material-icons" onClick={onBack}>arrow_back</i>
				<span>{`${title} / ${name}`}</span>
			</div>
		</ApplicationSectionHeader>
	)
}

export function ElementContent({ children }) {
	return (
		<div className="element-content">
			{children}
		</div>
	)
}

export function ElementTitle({ icon, text, buttonTitle, onClick, isLoading, children, height = "30px" }) {
	return (
		<div>
			<div className="element-title">
				<div className="element-title-name">
					<Img src={getProcessIcon(icon || 'default.png')} height={height} />
					<div>
						<span>{text}</span>
						<div>
							{children}
						</div>
					</div>
				</div>
				{buttonTitle && <Button type='gray' isLoading={isLoading} style={{ height: "30px" }} onClick={onClick}>{buttonTitle}</Button>}
			</div>
		</div>
	)
}

