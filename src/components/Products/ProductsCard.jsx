import React from 'react'
import Card from '../Card/Card.jsx'
import Dialog from '../Card/Dialog.jsx'
import Icon from '../Card/Icon.jsx'
import { connect } from 'react-redux'
import * as actions from './ProductsActions.jsx'
import ProductsCardInventory from './ProductsCardInventory.jsx'
import ProductsArchiveDialog from './ProductsArchiveDialog.jsx'

export default class ProductsCard extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			archive: false,
			edit: false
		}

		this.handleToggleArchive = this.handleToggleArchive.bind(this)
	}

	render() {
		let { data, ui } = this.props
		let product = data[ui.selectedItem]

		if (!product)
			return false;

		return (
			<Card big={true}>
				<div className="products-card">
					{this.renderHeader(product)}
					{this.renderDescription(product)}
					{this.renderCreatedBy(product)}
					{this.renderRule()}
					<ProductsCardInventory {...this.props } />
					{this.renderArchiveDialog()}
				</div>
				
			</Card>
		)
	}

	renderArchiveDialog() {
		if(this.state.archive)
			return <ProductsArchiveDialog onCancel={this.handleToggleArchive}/>
		else return null
	}

	renderRule() {
		return (
			<div className="products-card-rule" style={{marginLeft: "-32px", marginRight: "-20px", width: "120%"}} />
		)
	}

	renderHeader(product) {
		return (
			<div className="products-card-section products-card-header">
				<div className="products-card-icon" style={{height: "24px"}}>
						<Icon src="" size="24px"/>
					</div>
					<h1 className="products-card-code">
						{product.code}
					</h1>
					<h1 className="products-card-name">
						{product.name}
					</h1>
					<span className="products-card-actions">
						<span>
							<i className="material-icons">edit</i>
							Edit
						</span>

						<span onClick={this.handleToggleArchive}>
							<i className="material-icons">delete_forever</i>
							Archive
						</span>
					</span>
				</div>
		)
	}

	renderDescription(product) {
		let className = ""
		let description = product.description
		if (!description || description.length == 0) {
			description = "No description"
			className = "products-card-description-empty"
		}

		return (
			<div className={"products-card-section products-card-description " + className}>
				<span>
					{description}
				</span>
			</div>
		)
	}

	renderCreatedBy(product) {
		return (
			<div className="products-card-section products-card-created-by">
				<span>
					Created on October 12, 2016
				</span>
			</div>
		)
	}

	handleToggleArchive(product) {
		this.setState({archive: !this.state.archive})
	}

}