import React from 'react'
import './styles/checklistitem.css'
import {Link} from 'react-router-dom'

export default function ChecklistItem({ header, text, link, isDone, onClick }) {
	return (
		<Link to={link}>
			<div className={"checklist-item " + (isDone && " checklist-item-done")}>
				<div className="checklist-item-circle">
					<div>
						{isDone && <i className="material-icons">check_circle</i>}
					</div>
				</div>
				<div className="checklist-item-content">
					<span className="checklist-item-header">{header}</span>
					<span className="checklist-item-text">{text}</span>
				</div>
				<div className="checklist-item-link">
					<i className="material-icons">arrow_forward</i>
				</div>
			</div>
		</Link>
	)

}

