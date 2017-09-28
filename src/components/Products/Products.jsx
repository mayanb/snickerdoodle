import React from 'react'
import { connect } from 'react-redux'
import * as actions from './ProductsActions.jsx'
import * as inventoryActions from '../Inventory/InventoryActions'

import ProductsCard from './ProductsCard.jsx'
import PaginatedTable from '../PaginatedTable/PaginatedTable.jsx'
import ProductsListItem from './ProductsListItem'
import CreateProductDropdown from './CreateProductDropdown'
import ProductsArchiveDialog from './ProductsArchiveDialog'
//import {findPosition, alphabetize} from './arrayutils.jsx'

import Card from '../Card/Card.jsx'

function titleRow() {
  return <ProductsListItem header item={{code: "ID", name: "Name"}} />
}

class Products extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isArchiveOpen: false, 
      archivingObjectIndex: -1, 
    }

    this.handleSelectProduct = this.handleSelectProduct.bind(this)
    this.handlePagination = this.handlePagination.bind(this)
    this.handleCreateProduct = this.handleCreateProduct.bind(this)
    this.handleArchiveProduct = this.handleArchiveProduct.bind(this)
    this.toggleArchive = this.toggleArchive.bind(this)
  }

  // fetch products on load
  componentDidMount() {
    this.props.dispatch(actions.fetchProducts())
  }

  render() {
    var { data, ui } = this.props
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
          <ProductsCard {...this.props} 
            onArchive={() => this.setState({isArchiveOpen: true, archivingObjectIndex: ui.selectedItem})}
          />
        </div>
        {this.renderArchiveDialog(data, ui)}
      </div>
    )
  }

  renderArchiveDialog(data, ui) {
    if (!this.state.isArchiveOpen)
      return null

    return (
      <ProductsArchiveDialog 
        {...data[this.state.archivingObjectIndex]} 
        onCancel={this.toggleArchive}
        onSubmit={() => this.handleArchiveProduct(this.state.archivingObjectIndex)}
      />
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
    let product = this.props.data[index]
    if (!product) 
      return 

    this.props.dispatch(actions.selectProduct(index))
    this.props.dispatch(inventoryActions.fetchInventory({products: product.code}))
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

  toggleArchive() {
    this.setState({isArchiveOpen: !this.state.isArchiveOpen})
  }

  handleArchiveProduct(index) {
    let newIndex = index
    if ( newIndex == this.props.data.length - 1)
      newIndex = index - 1

    let p = this.props.data[index]
    let c = this

    this.props.dispatch(actions.postDeleteProduct(p, index, function () {
        c.handleSelectProduct(index)
        c.toggleArchive()
      })
    )
  }


}

// This is our select function that will extract from the state the data slice we want to expose
// through props to our component.
const mapStateToProps = (state/*, props*/) => {
  return {
    data: state.products.data,
    ui: state.products.ui,
    inventoryData: state.inventories.data
    // inventories: state.products.inventories
  }
}

const connectedProducts = connect(mapStateToProps)(Products)

export default connectedProducts
