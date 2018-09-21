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

const { confirm } = Modal

class Products extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			isAddingProduct: false,
			filter: null,
			ordering: 'name',
		}

		this.renderHeaderRow = this.renderHeaderRow.bind(this)

		this.handleFilter = this.handleFilter.bind(this)
		this.handleToggleDialog = this.handleToggleDialog.bind(this)
		this.handlePagination = this.handlePagination.bind(this)
		this.handleCreateProduct = this.handleCreateProduct.bind(this)
		this.handleArchive = this.handleArchive.bind(this)
		this.handleSelect = this.handleSelect.bind(this)
		this.handleReorder = this.handleReorder.bind(this)
  	}

  // fetch products on load
	componentDidMount() {
		this.fetchProducts()
		this.props.dispatch(recipeActions.fetchRecipes())
	}

	fetchProducts() {
		const { ordering, filter } = this.state
		const params = {}
		if (ordering) {
  			params['ordering'] = ordering
		}
		if (filter) {
			params['filter'] = filter
		}
		this.props.dispatch(actions.fetchProducts(params))
	}

  	render() {
		let { users, ui, data } = this.props
		let account_type = users.data[users.ui.activeUser].user.account_type
		if (account_type !== 'a') {
			this.props.history.push('/')
		}

		let hasNone = !ui.isFetchingData && (!data || !data.length) && !this.state.filter
		return (
			<div className="products">
				<ApplicationSectionHeaderWithButton 
					onToggleDialog={this.handleToggleDialog} 
					buttonText="Create product"
					title="Products" 
				/>
				{ hasNone ? <ZeroState type="product" /> : this.renderTable() }
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
						TitleRow={this.renderHeaderRow}
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

	renderHeaderRow() {
		const columns = [
			{ title: 'Code', className: 'code', field: 'code' },
			{ title: 'Name', className: 'name', field: 'name' },
			{ title: 'Owner', className: 'owner', field: null },
			{ title: 'Date Created', className: 'date', field: 'created_at' },
			{ title: null, className: 'more-options-button', field: null },
		]
		return (
			<ObjectListHeader
				columns={columns}
				onReorder={this.handleReorder}
				ordering={this.state.ordering}
			/>
		)
	}

	handleReorder(ordering) {
		this.setState({ordering: ordering}, this.fetchProducts)
	}

	/* EVENT HANDLERS */
	handleFilter(filterText) {
		this.setState({ filter: filterText }, this.fetchProducts)
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
