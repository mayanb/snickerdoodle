import React from 'react'
import './styles/objectlisttitle.css'
import Button from '../Card/Button.jsx'

export default class ObjectListTitle extends React.Component {
	render() {
		let {title, buttonText, onToggleDialog } = this.props
		return (
			<div className="object-list-title">
				<div>{title}</div>
				<Button onClick={onToggleDialog}>
					{buttonText}
				</Button>
			</div>
		)
	}
}
