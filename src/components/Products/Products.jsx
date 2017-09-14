import React from 'react'
import { connect } from 'react-redux'
import * as actions from './ProductsActions.jsx'

import ProductsCard from './ProductsCard.jsx'
import PaginatedTable from '../PaginatedTable/PaginatedTable.jsx'
import ProductsListItem from './ProductsListItem'
import CreateProductDropdown from './CreateProductDropdown'

function titleRow() {
  return <ProductsListItem header item={{code: "ID", name: "Name"}} />
}

class Products extends React.Component {
  constructor(props) {
    super(props)

    this.handleSelectProduct = this.handleSelectProduct.bind(this)
    this.handlePagination = this.handlePagination.bind(this)
  }

  // fetch products on load
  componentDidMount() {
    this.props.dispatch(actions.fetchProducts())
  }

  render() {
    var { items, ui } = this.props
    return (
      <div className="nav-section products">
        <div className="nav-section-list">
          { this.renderTitle() }
          <PaginatedTable 
            {...this.props}
            onClick={this.handleSelectProduct} 
            onPagination={this.handlePagination} 
            Row={ProductsListItem}
            TitleRow={titleRow}
          />
        </div>
        <div>
          <ProductsCard {...this.props} />
        </div>
      </div>
    )
  }

  renderTitle() {
    return (
      <div className="nav-section-header">
        <h1>Product Lines</h1>
        { this.renderCreateProductButton() }
      </div>
    )
  }

  renderCreateProductButton() {
    return (
      <div className="products-list-actions">
        <div className="products-create-product">
          <CreateProductDropdown>Create product</CreateProductDropdown>
        </div>
      </div>
    )
  }

  /* EVENT HANDLERS */
  handleSelectProduct(id) {
    let product = this.props.items[id]

    if (!product) 
      return 

    this.props.dispatch(actions.selectProduct(id))
    this.props.dispatch(actions.fetchProductInventory(product))
  }

  handlePagination(direction) {
    this.props.dispatch(actions.pageProducts(direction))
  }

  handleEditProduct(id, params) {
    if (!this.props.items[id])
      return

    //this.props.dispatch(actions.editProduct(id, params))
  }


}

// This is our select function that will extract from the state the data slice we want to expose
// through props to our component.
const mapStateToProps = (state/*, props*/) => {
  return {
    items: state.products.items,
    ui: state.products.ui,
    inventories: state.products.inventories
  }
}

const connectedProducts = connect(mapStateToProps)(Products)

export default connectedProducts
