import React from 'react'
import ProductsListItem from './ProductsListItem.jsx'
import Button from '../Card/Button.jsx'
import CreateProductDropdown from './CreateProductDialog.jsx'

const PRODUCTS_PAGE_SIZE = 10

export default class ProductsList extends React.Component {
  constructor(props) {
    super(props)
    this.handlePagination = this.handlePagination.bind(this)
  }

	render() {
		return (
			<div className="products-list">
			 	{this.renderTitle()}
			 	{this.renderContent()}
			</div>
		)
	}

	renderTitle() {
    return (
      <div className="products-page-header">
        <h1>Product Lines</h1>
        { this.renderCreateProductButton() }
      </div>
    )
  }

  renderContent() {
    if (this.props.ui.isFetchingList) {
      return (
          <span>Loading...</span>
      )
    } else {
      return this.renderProductList()
    }
  }

  renderListHeader() {
    let header = {code: "ID", name: "Name"}

    return (
      <li>
        <ProductsListItem header={true} isSelected={false} product={header} />
      </li>
    )
  }

  renderPagination(firstIndex, lastIndex, len, onPagination) {
    let detail = `${firstIndex+1}-${lastIndex} of ${len} product types`

    let disabledBack = this.canPage(firstIndex,lastIndex, len, -1)?"":" disabled"
    let disabledFwd = this.canPage(firstIndex,lastIndex, len, +1)?"":" disabled"

    return (
      <div className="product-list-pagination">
        <span>{detail}</span>
        <i className={"products-list-arrow material-icons" + disabledBack} onClick={() => onPagination(-1)}>keyboard_arrow_left</i>
        <i className={"products-list-arrow material-icons" + disabledFwd} onClick={() => onPagination(1)}>keyboard_arrow_right</i>
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

  renderProductList() {
    let { ui, items } = this.props

    let keys = Object.keys(items)

    if (!keys || keys.length == 0) {
      return <span> No items </span>
    }

    let firstIndex = ui.currentPage * PRODUCTS_PAGE_SIZE
    let lastIndex = Math.min(keys.length, firstIndex + PRODUCTS_PAGE_SIZE)
    let totalLen = keys.length
    keys = keys.slice(firstIndex, lastIndex)

    return (
      <div>
        { this.renderPagination(firstIndex, lastIndex, totalLen, this.handlePagination) }
        <ul>
          { this.renderListHeader() }
          {
            keys.map(function (k, i) {
              return (
                <li key={k} >
                  <ProductsListItem 
                    isSelected={this.isSelected(items[k])} 
                    product={items[k]} onClick={(e) => this.props.onClick(k)} 
                  />
                </li>)
            }, this)
          }
        </ul>
      </div>
    )
  }

  isSelected(item) {
    return this.props.ui.selectedItem == item.id
  }

  handlePagination(direction) {
    let { ui, items } = this.props
    let keys = Object.keys(items)
    let firstIndex = ui.currentPage * PRODUCTS_PAGE_SIZE
    let lastIndex = Math.min(keys.length, firstIndex + PRODUCTS_PAGE_SIZE)

    // error check just in case!!
    if (!this.canPage(firstIndex, lastIndex, keys.length, direction))
      return 

    this.props.onPagination(direction)
  }

  canPage(firstIndex, lastIndex, len, direction) {
    if (direction == -1 && firstIndex == 0)
      return false

    if (direction == 1 && lastIndex >= len)
      return false

    return true
  }

}