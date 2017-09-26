import React from 'react'
import Dialog from '../Card/Dialog.jsx'
import Button from '../Card/Button.jsx'

export default class ProductsArchiveDialog extends React.Component {
	render() {
		return (
			<Dialog>
				<div className="products-archive-dialog">
					<h1>Archive</h1>
					<span>{`Are you sure you want to remove ${this.props.name} (${this.props.code}) from your active list?`}</span>
					<div className="products-archive-rule" style={{marginLeft: "-32px", marginRight: "-20px", width: "120%"}} />
					<div className="products-archive-actions">
						<Button secondary onClick={this.props.onCancel}>Cancel</Button>
						<Button onClick={this.props.onSubmit}>Yes, archive!</Button>
					</div>
				</div>
			</Dialog>
		)
	}
}