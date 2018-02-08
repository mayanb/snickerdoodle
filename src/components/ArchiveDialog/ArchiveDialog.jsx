import React from 'react'
import Dialog from '../Card/Dialog.jsx'
import Button from '../Card/Button.jsx'
import './styles/archivedialog.css'

export default class ArchiveDialog extends React.Component {
	render() {
		return (
			<Dialog onToggle={this.props.onCancel}>
				<div className="archive-dialog">
					<h1>Archive</h1>
					<span>{`Are you sure you want to remove ${this.props.name} (${this.props.code}) from your active list?`}</span>
					<div className="archive-rule" style={{marginLeft: "-32px", marginRight: "-20px", width: "120%"}} />
					<div className="archive-actions">
						<Button secondary onClick={this.props.onCancel}>Cancel</Button>
						<Button onClick={this.props.onSubmit}>Yes, archive!</Button>
					</div>
				</div>
			</Dialog>
		)
	}
}