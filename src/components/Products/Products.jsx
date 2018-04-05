import React from 'react'
import { connect } from 'react-redux'
import * as actions from './ProductsActions.jsx'
import Img from '../Img/Img'
import ObjectList from '../ObjectList/ObjectList'
import ObjectListHeader from '../ObjectList/ObjectListHeader'
import PaginatedTable from '../PaginatedTable/PaginatedTable.jsx'
import ProductsListItem from './ProductsListItem'
import CreateProductDialog from './CreateProductDialog'
import ApplicationSectionHeaderWithButton from '../Application/ApplicationSectionHeaderWithButton'
import ArchiveDialog from '../ArchiveDialog/ArchiveDialog'
import './styles/products.css'


class Products extends React.Component {
  constructor(props) {
    super(props)

	  this.state = {
		  isAddingProduct: false,
		  isAddingProcess: false,
		  isArchiveOpen: false,
		  isArchiving: false,
		  archivingObjectIndex: null,
		  isDuplicateOpen: false,
	  }

	  this.handleToggleDialog = this.handleToggleDialog.bind(this)
    this.handlePagination = this.handlePagination.bind(this)
    this.handleCreateProduct = this.handleCreateProduct.bind(this)
	  this.handleArchive = this.handleArchive.bind(this)
  }

  // fetch products on load
  componentDidMount() {
    this.props.dispatch(actions.fetchProducts())
  }

  render() {
    let { users, ui, data } = this.props
    let account_type = users.data[users.ui.activeUser].user.account_type
    if (account_type !== 'a')
    	this.props.history.push('/')

	  return (
	  	<div className="products">
			  <ApplicationSectionHeaderWithButton onToggleDialog={this.handleToggleDialog} buttonText="Create product"
			                                      title="Products" />

				{ !ui.isFetchingData && (!data || !data.length) ? this.renderZeroState() :
				  <ObjectList className="products" isFetchingData={ui.isFetchingData}>
					  <PaginatedTable
						  {...this.props}
						  onPagination={this.handlePagination}
						  Row={ProductsListItem}
						  TitleRow={this.headerRow}
						  extra={{onArchive: this.handleArchive}}
					  />
					  {this.renderDialog()}
					  {this.renderArchiveDialog()}
				  </ObjectList>
				}
		  </div>
	  )
  }

   renderZeroState() {
  	return (
  		<div style={{width: "100%", height: "70%", display: "flex", alignItems: "center", justifyContent: "center"}}>
	  		<Img style={{cursor: "pointer"}} onClick={() => window.location = 'https://polymer.helpscoutdocs.com'} useExtension src="product-zero-state.svg" />
	  	</div>
  	)
  }

  renderDialog() {
	  return (
		  <CreateProductDialog
			  isOpen={this.state.isAddingProduct}
			  onToggle={this.handleToggleDialog}
			  onCreate={this.handleCreateProduct}
		  />
	  )
  }

	renderArchiveDialog() {
		if (!this.state.isArchiveOpen) {
			return null
		}
		let p = this.props.data[this.state.archivingObjectIndex]
		return (
			<ArchiveDialog
				{...p}
				type="product"
				isArchiving={this.state.isArchiving}
				onCancel={this.handleCancelArchive.bind(this)}
				onSubmit={() => this.handleConfirmArchive()}
			/>
		)
	}

	headerRow() {
		return (
			<ObjectListHeader>
				<div className="code">Code</div>
				<div className="name">Name</div>
				<div className="owner">Owner</div>
				<div className="date">Date Created</div>
				<div className="more-options-button"></div>
			</ObjectListHeader>
		)
	}

  /* EVENT HANDLERS */
  handlePagination(direction) {
    this.props.dispatch(actions.pageProducts(direction))
  }

	handleToggleDialog() {
		this.setState({isAddingProduct: !this.state.isAddingProduct})
	}

  handleCreateProduct(json) {
    this.props.dispatch(actions.postCreateProduct(json))
	    .then((res) => {
	    	this.props.dispatch(actions.fetchProducts())
		    this.handleToggleDialog()
	    })
  }

	handleArchive(index) {
		this.setState({ isArchiveOpen: true, archivingObjectIndex: index })
	}

	handleCancelArchive() {
		this.setState({isArchiveOpen: false})
	}

	handleConfirmArchive() {
		if (this.state.isArchiving) {
			return
		}

		let p = this.props.data[this.state.archivingObjectIndex]
		this.setState({isArchiving: true})
		this.props.dispatch(actions.postDeleteProduct(p, this.state.archivingObjectIndex))
			.then(() => this.setState({isArchiving: false, isArchiveOpen: false}))
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
