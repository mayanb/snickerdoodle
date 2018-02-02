import React from 'react'
import { connect } from 'react-redux'
import * as actions from './ProductsActions.jsx'

import ObjectList from '../ObjectList/ObjectList'
import ObjectListHeader from '../ObjectList/ObjectListHeader'
import ObjectListTitle from '../ObjectList/ObjectListTitle'
import PaginatedTable from '../PaginatedTable/PaginatedTable.jsx'
import ProductsListItem from './ProductsListItem'
import CreateProductDialog from './CreateProductDialog'
import './styles/products.css'



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
    let { users } = this.props
    let account_type = users.data[users.ui.activeUser].user.account_type
    if (account_type !== 'a')
    	this.props.history.push('/')

	  return (
			<ObjectList className="products" isFetchingData={this.props.ui.isFetchingData}>
			  {this.renderTitle()}
			  <PaginatedTable
				  {...this.props}
				  onClick={this.handleSelectProduct}
				  onPagination={this.handlePagination}
				  Row={ProductsListItem}
				  TitleRow={this.headerRow}
			  />
		  </ObjectList>
	  )
  }

  renderTitle() {
    return (
    	<ObjectListTitle title="All products" buttonText="Create product">
		    <CreateProductDialog
			    onSubmit={this.handleCreateProduct.bind(this)}
			    ui={this.props.ui}
		    />
	    </ObjectListTitle>
    )
  }

	headerRow() {
		return (
			<ObjectListHeader>
				<div className="code">Code</div>
				<div className="name">Name</div>
				<div className="owner">Owner</div>
				<div className="date">Date Created</div>
			</ObjectListHeader>
		)
	}

  /* EVENT HANDLERS */
  handleSelectProduct(index) {
    this.props.history.push('/products/' + this.props.data[index].id)
  }

  handlePagination(direction) {
    this.props.dispatch(actions.pageProducts(direction))
  }

  handleCreateProduct(json) {
    this.props.dispatch(actions.postCreateProduct(json))
	    .then((res) => {
		    let index = this.props.data.findIndex((e, i, a) => e.id === res.item.id)
		    return this.handleSelectProduct(index)
	    })
  }
}

// This is our select function that will extract from the state the data slice we want to expose
// through props to our component.
const mapStateToProps = (state/*, props*/) => {
  return {
    data: state.products.data,
    ui: state.products.ui,
    users: state.users
  }
}

const connectedProducts = connect(mapStateToProps)(Products)

export default connectedProducts
