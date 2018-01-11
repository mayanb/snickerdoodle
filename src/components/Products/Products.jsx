import React from 'react'
import { connect } from 'react-redux'
import * as actions from './ProductsActions.jsx'
import * as inventoryActions from '../Inventory/InventoryActions'

import PaginatedTable from '../PaginatedTable/PaginatedTable.jsx'
import ProductsListItem from './ProductsListItem'
import CreateProductDropdown from './CreateProductDropdown'
import Card from '../Card/Card.jsx'
import './styles/products.css'
import './styles/navsection.css'


function titleRow() {
  return <ProductsListItem header item={{ code: "ID", name: "Name" }} />
}

class Products extends React.Component {
  constructor(props) {
    super(props)

    this.handleSelectProduct = this.handleSelectProduct.bind(this)
    this.handlePagination = this.handlePagination.bind(this)
    this.handleCreateProduct = this.handleCreateProduct.bind(this)
  }

  // fetch products on load
  componentDidMount() {
    this.props.dispatch(actions.fetchProducts())
  }

  render() {
    var { data, ui, users } = this.props
    let account_type = users.data[users.ui.activeUser].user.account_type
    if (account_type != 'a')
      return null

    return (
      <div className="nav-section products">
        <div className="nav-section-list">
          {this.renderTitle()}
          <PaginatedTable
            {...this.props}
            onClick={this.handleSelectProduct}
            onPagination={this.handlePagination}
            Row={ProductsListItem}
            TitleRow={titleRow}
          />
        </div>
      </div>
    )
  }


  renderTitle() {
    return (
      <div className="nav-section-header">
        <h1>Products</h1>
        {this.renderCreateProductButton()}
      </div>
    )
  }

  renderCreateProductButton() {
    return (
      <div className="products-list-actions">
        <div className="products-create-product">
          <CreateProductDropdown
            onSubmit={this.handleCreateProduct}
            ui={this.props.ui}
          />
        </div>
      </div>
    )
  }

  /* EVENT HANDLERS */
  handleSelectProduct(index) {
    this.props.history.push('/products/' + this.props.data[index].id)
  }

  handlePagination(direction) {
    this.props.dispatch(actions.pageProducts(direction))
  }

  handleEditProduct(index, params) {
    if (!this.props.data[index])
      return

    //this.props.dispatch(actions.editProduct(id, params))
  }

  handleCreateProduct(json) {
    this.props.dispatch(actions.postCreateProduct(json, (id) => {
      let index = this.props.data.findIndex((e, i, a) => e.id === id)
      this.handleSelectProduct(index)
    }))
  }



}

// This is our select function that will extract from the state the data slice we want to expose
// through props to our component.
const mapStateToProps = (state/*, props*/) => {
  return {
    data: state.products.data,
    ui: state.products.ui,
    inventoryData: state.inventories.data,
    users: state.users
    // inventories: state.products.inventories
  }
}

const connectedProducts = connect(mapStateToProps)(Products)

export default connectedProducts
