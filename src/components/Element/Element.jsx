import React from 'react'
import ApplicationSectionHeader from '../Application/ApplicationSectionHeader'
import Img, { ic } from '../Img/Img'
import Button from '../Button/Button'
import './styles/element.css'

export function ElementHeader({title, name, onBack}) {
	return (
		<ApplicationSectionHeader>
			<div className="element-header">
				<i className="material-icons" onClick={onBack}>arrow_back</i>
				<span>{`${title} / ${name}`}</span>
			</div>
		</ApplicationSectionHeader>
	)
}

export function ElementContent({children}) {
	return (
		<div className="element-content">
			{children}
		</div>
	)
}

export function ElementTitle({icon, text, buttonTitle, onClick, isLoading}) {
	return (
		<div className="element-title">
			<div className="element-title-name">
				<Img src={ic(icon || 'default.png')} height="30px" />
				<span>{text}</span>
			</div>
			{ buttonTitle && <Button type='gray' isLoading={isLoading} onClick={onClick}>{buttonTitle}</Button> }
		</div>
	)
}

