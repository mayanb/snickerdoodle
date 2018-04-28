import React from 'react'
import { connect } from 'react-redux'
import { Modal } from 'antd'
import * as actions from './ProductsActions.jsx'
import ObjectList from '../ObjectList/ObjectList'
import ObjectListHeader from '../ObjectList/ObjectListHeader'
import ZeroState from '../ObjectList/ObjectListZeroState'
import PaginatedTable from '../PaginatedTable/PaginatedTable.jsx'
import ProductsListItem from './ProductsListItem'
import CreateProductDialog from './CreateProductDialog'
import ApplicationSectionHeaderWithButton from '../Application/ApplicationSectionHeaderWithButton'
import Dialog from '../Card/Dialog'
import Button from '../Card/Button'
import ElementFilter from '../Element/ElementFilter'
import './styles/products.css'

const { confirm } = Modal

class Products extends React.Component {
  constructor(props) {
    super(props)

	  this.state = {
		  isAddingProduct: false,
		  isFiltering: false,
		  shouldDisplayRecipeModal: !window.localStorage.getItem("CREATE_RECIPE_INFO"),
	  }

	  this.handleFilter = this.handleFilter.bind(this)
	  this.handleToggleDialog = this.handleToggleDialog.bind(this)
    this.handlePagination = this.handlePagination.bind(this)
    this.handleCreateProduct = this.handleCreateProduct.bind(this)
	  this.handleArchive = this.handleArchive.bind(this)
	  this.handleSelect = this.handleSelect.bind(this)
	  this.handleCloseCreateRecipeModal = this.handleCloseCreateRecipeModal.bind(this)
  }

  // fetch products on load
  componentDidMount() {
    this.props.dispatch(actions.fetchProducts())
    this.props.dispatch(actions.fetchRecipes())
  }

  render() {
    let { users, ui, data, recipeUI, recipeData } = this.props
    let { shouldDisplayRecipeModal } = this.state
    let account_type = users.data[users.ui.activeUser].user.account_type
    if (account_type !== 'a') {
    	this.props.history.push('/')
    }

    let hasNone = !ui.isFetchingData && (!data || !data.length) && !this.state.isFiltering
    let hasRecipes = !recipeUI.isFetchingData && (recipeData && recipeData.length > 0)

	  return (
	  	<div className="products">
			  <ApplicationSectionHeaderWithButton onToggleDialog={this.handleToggleDialog} buttonText="Create product"
			                                      title="Products" />
					{ hasNone ? <ZeroState type="product" /> : this.renderTable() }
					{ (!hasNone && hasRecipes) || !shouldDisplayRecipeModal ? null : this.renderCreateRecipeModal()}
			 		{this.renderDialog()}
		  </div>
	  )
  }

  renderTable() {
  	return (
  		<div>
  			<ElementFilter onChange={this.handleFilter} className="product-filter" />
	  		<ObjectList className="products" isFetchingData={this.props.ui.isFetchingData}>
				  <PaginatedTable
					  {...this.props}
					  onClick={this.handleSelect}
					  onPagination={this.handlePagination}
					  Row={ProductsListItem}
					  TitleRow={this.headerRow}
					  extra={{onArchive: this.handleArchive}}
				  />
			  </ObjectList>
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

  renderCreateRecipeModal() {
  	let HEADER = {fontSmoothing: 'antialiased', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px 0'}
	let H1 = {color: "#0073F9", padding: "0 8px"}

  	return(
			<Dialog onToggle={this.handleCloseCreateRecipeModal} className='new-features-card'>
				<div style={{margin: "-16px"}}>
					<div style={HEADER} className="new-feature-header">
						<h1 style={H1}>Create a Recipe</h1>
					</div>

					<div className="features">
						<span className="nf-content">Create your first Recipe by clicking on one of your products. You can then define recipes on its product page by adding instructions and ingredients to your recipe.</span>
					</div>
				</div>
				<div style={{display: 'flex', alignItems: 'flex-end', 'justifyContent': 'center', marginTop: '24px'}}>
					<Button link onClick={this.handleCloseCreateRecipeModal}>Close</Button>
				</div>
			</Dialog>
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
  handleCloseCreateRecipeModal() {
  	this.setState({shouldDisplayRecipeModal: false})
  	window.localStorage.setItem("CREATE_RECIPE_INFO", true)
  }

  handleFilter(filterText) {
  	this.setState({ isFiltering: filterText && filterText.length })
  	this.props.dispatch(actions.fetchProducts({ filter: filterText }))
  }

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

  handleSelect(index) {
  	this.props.history.push('/products/' + this.props.data[index].id)
	}

	handleArchive(index) {
		let p = this.props.data[index]
		confirm({
			title: `Are you sure you want to delete ${p.name} (${p.code})?`,
			content: "Your old tasks will be unaffected, but you won't be able to make new tasks with this product type.",
			okText: 'Yes, I\'m sure',
			okType: 'danger',
			onOk: () => this.handleConfirmArchive(index),
			onCancel: () => {}
		})
	}

	handleConfirmArchive(index) {
		return this.props.dispatch(actions.postDeleteProduct(this.props.data[index], index))
	}

}

// This is our select function that will extract from the state the data slice we want to expose
// through props to our component.
const mapStateToProps = (state/*, props*/) => {
  return {
    data: state.products.data,
    ui: state.products.ui,
    users: state.users,
    recipeData: state.recipes.data,
    recipeUI: state.recipes.ui
  }
}

const connectedProducts = connect(mapStateToProps)(Products)

export default connectedProducts
