import React from 'react'
import { connect } from 'react-redux'
import { Modal, message } from 'antd'
import * as actions from './ProductsActions'
import * as recipeActions from '../RecipeList/RecipeActions'
import ObjectList from '../ObjectList/ObjectList'
import ObjectListHeader from '../ObjectList/ObjectListHeader'
import ZeroState from '../ObjectList/ObjectListZeroState'
import PaginatedTable from '../PaginatedTable/PaginatedTable'
import ProductsListItem from './ProductsListItem'
import CreateProductDialog from './CreateProductDialog'
import ApplicationSectionHeaderWithButton from '../Application/ApplicationSectionHeaderWithButton'
import ElementFilter from '../Element/ElementFilter'
import './styles/products.css'
import PageSpecificNewFeatureIntro from '../NewFeatures/PageSpecificNewFeatureIntro'

const { confirm } = Modal

class Products extends React.Component {
  constructor(props) {
    super(props)

	  this.state = {
		  isAddingProduct: false,
		  isFiltering: false,
			shouldDisplayRecipeModal: true,
	  }

	  this.handleCloseRecipeAnnouncementModal = this.handleCloseRecipeAnnouncementModal.bind(this)
	  this.handleFilter = this.handleFilter.bind(this)
	  this.handleToggleDialog = this.handleToggleDialog.bind(this)
    this.handlePagination = this.handlePagination.bind(this)
    this.handleCreateProduct = this.handleCreateProduct.bind(this)
	  this.handleArchive = this.handleArchive.bind(this)
	  this.handleSelect = this.handleSelect.bind(this)
  }

  // fetch products on load
  componentDidMount() {
    this.props.dispatch(actions.fetchProducts())
    this.props.dispatch(recipeActions.fetchRecipes())
  }

  render() {
    let { users, ui, data, recipeUI, recipeData } = this.props
		const { shouldDisplayRecipeModal } = this.state
    let account_type = users.data[users.ui.activeUser].user.account_type
    if (account_type !== 'a') {
    	this.props.history.push('/')
    }

    let hasNone = !ui.isFetchingData && (!data || !data.length) && !this.state.isFiltering
    let hasNoRecipes = !recipeUI.isFetchingData && (!recipeData || !recipeData.length)
	  return (
	  	<div className="products">
			  <ApplicationSectionHeaderWithButton onToggleDialog={this.handleToggleDialog} buttonText="Create product"
			                                      title="Products" />
					{ hasNone ? <ZeroState type="product" /> : this.renderTable() }
					{ (!hasNone && hasNoRecipes && shouldDisplayRecipeModal) ? this.renderCreateRecipeModal() : null}
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
  	return (<PageSpecificNewFeatureIntro
			onClose={this.handleCloseRecipeAnnouncementModal}
			content="Polymer's powerful Recipes help you stay even more organized. Set ingredients and instructions to guide your team and automatically update inventory."
			title="Introducing Recipes"
			finalCallToAction="Learn how to create your first recipe now!"
			imgSrc="dairyfactory"
			imgHeightWithUnits="350px"
			link="https://polymer.helpscoutdocs.com/article/10-understanding-recipes"
			localStorageVarName="CREATE_RECIPE_INFO"
		/>)
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
	handleCloseRecipeAnnouncementModal() {
		this.setState({shouldDisplayRecipeModal: false})
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
	    .then(res => {
		    const index = this.props.data.findIndex(e => e.id === res.item.id)
		    return this.handleSelect(index)
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
		let p = this.props.data[index]
		return this.props.dispatch(actions.postDeleteProduct(p, index))
			.catch(e => {
				message.error(`Oops! We couldn't delete ${p.name} (${p.code}). Try again later.`)
			})
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
