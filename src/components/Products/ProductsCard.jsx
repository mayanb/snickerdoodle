import React from 'react'
import Card from '../Card/Card.jsx'
import Dialog from '../Card/Dialog.jsx'
import Icon from '../Card/Icon.jsx'
import { connect } from 'react-redux'
import * as actions from './ProductsActions.jsx'
import ProductsCardInventory from './ProductsCardInventory.jsx'
import ProductsArchiveDialog from './ProductsArchiveDialog'
import {ElementHeader} from '../Element/Element'
import ElementMenu from '../Element/ElementMenu'
import { Link } from 'react-router-dom'
import './styles/productscard.css'

export class ProductsCard extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
      isArchiveOpen: false,
			edit: false
		}
	}

    // fetch products on load
    componentDidMount() {
        this.props.dispatch(actions.fetchProducts())
    }

	render() {
    let { product, ui } = this.props

		if (!product)
			return false;

    return (
      <div className="products-card">
        <button className="link">
          <Link to="/products">Back to Products</Link>
        </button>
        <ElementHeader {...product} actions={this.renderMenu()} />
        {this.renderDescription(product)}
        {this.renderCreatedBy(product)}
        {this.renderRule()}
        <ProductsCardInventory {...this.props} />
        {this.renderArchiveDialog(product, ui)}
      </div>

    )
  }

	renderMenu() {
		return <ElementMenu
			onArchive={this.handleArchive.bind(this)}
			onEdit={() => null}
		/>
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
						<Icon src="" size="24px" content={product.name}/>
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

						<span onClick={this.toggleArchive}>
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

  renderArchiveDialog(product, ui) {
    if (!this.state.isArchiveOpen)
      return null

    return (
      <ProductsArchiveDialog
        {...product}
        onCancel={this.toggleArchive.bind(this)}
        onSubmit={() => this.handleConfirmArchive(this.props.product)}
      />
    )
  }

  toggleArchive() {
    this.setState({ isArchiveOpen: !this.state.isArchiveOpen })
  }

  handleArchive() {
    this.toggleArchive()
  }

  handleConfirmArchive(product) {
    let c = this
    this.props.dispatch(actions.postDeleteProduct(product, null, function () {
        c.props.history.push('/products')
      })
    )
  }

}

// This is our select function that will extract from the state the data slice we want to expose
// through props to our component.
const mapStateToProps = (state, props) => {
    let product = state.products.data.find(product => String(product.id) === props.match.params.id)

    return {
        product: product,
        ui: state.products.ui,
        dispatch: state.dispatch,
        inventoryData: state.inventories.data,
        users: state.users
        // inventories: state.products.inventories
    }
}

const connectedProductsCard = connect(mapStateToProps)(ProductsCard)

export default connectedProductsCard
