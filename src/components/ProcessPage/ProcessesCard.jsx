import React from 'react'
import Card from '../Card/Card.jsx'
import Dialog from '../Card/Dialog.jsx'
import Icon from '../Card/Icon.jsx'
import { connect } from 'react-redux'
import Button from '../Card/Button'
import ButtonDropdown from '../Card/ButtonDropdown'
import {ElementHeader} from '../Element/Element'
import ElementMenu from '../Element/ElementMenu'
import ProcessAttributeList from '../ProcessAttribute/ProcessAttributeList'

export default class ProcessCard extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			isArchiveOpen: false,
			isEditOpen: false, 
		}


	}

	render() {
		let { data, ui, process } = this.props

		if (!process)
			return false;

		return (
			<Card big={true}>
				<div className="products-card">
					<ElementHeader {...process} actions={this.renderMenu()}/>
					{this.renderRule()}
					{this.renderDescription(process)}
					<ProcessAttributeList />
					{this.renderEditDialog()}
				</div>
			</Card>
		)
	}

	renderMenu() {
		return <ElementMenu
			onArchive={this.props.onArchive} 
			onEdit={() => null}
		/>
	}

	renderRule() {
		return (
			<div className="products-card-rule" style={{marginLeft: "-32px", marginRight: "-20px", width: "120%"}} />
		)
	}

	renderEditDialog() {
		if (!this.state.isEditOpen)
			return null

		return (
			<Dialog>
			</Dialog>
		)
	}

	renderDescription(process) {
		let className = ""
		let description = process.description
		if (!description || description.length == 0) {
			description = "No description"
			className = "products-card-description-empty"
		}

		return (
			<div className={"products-card-section products-card-description " + className}>
				<h2 className="description-header">Description</h2>
				<span>
					Apple have made the great improvements in the Interface Builder in Xcode 8. Using the size classes became more intuitive, ability to zoom your storyboard is very convenient.
				</span>
			</div>
		)
	}

	renderCreatedBy(process) {
		return (
			<div className="products-card-section products-card-created-by">
				<span>
					Created on October 12, 2016
				</span>
			</div>
		)
	}

/* 					<ProcessesCardInventory {...this.props } /> */

}