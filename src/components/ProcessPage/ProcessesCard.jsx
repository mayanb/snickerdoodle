import React from 'react'
import Card from '../Card/Card.jsx'
import Dialog from '../Card/Dialog.jsx'
import {ElementHeader} from '../Element/Element'
import ElementMenu from '../Element/ElementMenu'
import ProcessAttributeList from '../ProcessAttribute/ProcessAttributeList'
import './styles/processescard.css'

export default class ProcessCard extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			isArchiveOpen: false,
			isEditOpen: false, 
		}


	}

	render() {
		let { process } = this.props

		if (!process)
			return false;

		return (
			<Card big={true}>
				<div className="products-card processes-card">
					<ElementHeader {...process} actions={this.renderMenu()}/>
					{this.renderRule()}
					{/**this.renderCreatedBy(process)*/}
					{this.renderDescription(process)}
					<ProcessAttributeList process={process}/>
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
				<div>
					{process.description}
				</div>
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