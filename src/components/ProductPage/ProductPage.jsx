import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { ElementHeader, ElementContent } from '../Element/Element'
import * as productActions from '../Products/ProductsActions'
import * as tagActions from '../Tags/TagActions'
import ProductInfo from './ProductInfo'
import RecipeList from '../RecipeList/RecipeList'
import './styles/productpage.css'
import { Modal, message } from 'antd'

const { confirm } = Modal

class ProductPage extends React.Component {
	constructor(props) {
		super(props)
		this.handleArchive = this.handleArchive.bind(this)
		this.handleSubmitEdit = this.handleSubmitEdit.bind(this)
	}

	componentDidMount() {
		const { dispatch } = this.props
		const { id } = this.props.match.params
		dispatch(productActions.fetchProducts())
			.then(() => dispatch(productActions.selectProduct(id)))
		this.props.dispatch(tagActions.fetchTags())
	}

	render() {
		let { data, history, ui } = this.props

		if (!data) {
			return null
		}

		return (
			<div className="product-page">
				<ElementHeader title={'Products'} name={data && data.name} onBack={() => history.push('/products')} />
				<ElementContent>
					<ProductInfo
						product={data}
						onArchive={this.handleArchive}
						onSubmitEdit={this.handleSubmitEdit}
						isSavingEdit={ui.isEditingItem}
					/>
        
					<div className="product-page-recipe-list">
						<RecipeList product={data} />
					</div>
				</ElementContent>
			</div>
		)
	}

	handleArchive() {
		confirm({
			title: `Are you sure you want to delete ${this.props.data.name} (${this.props.data.code})?`,
			content: "Your old tasks will be unaffected, but you won't be able to make new tasks with this product type.",
			okText: 'Yes, I\'m sure',
			okType: 'danger',
			onOk: () => this.handleConfirmArchive(),
			onCancel: () => {}
		})
	}
	
	handleConfirmArchive() {
		let { dispatch, history, data, index } = this.props
		return dispatch(productActions.postDeleteProduct(data, index))
			.then(() => history.push('/products'))
			.catch(e => {
				message.error(`Oops! We couldn't delete ${data.name} (${data.code}). Try again later.`)
			})
	}
	
	handleSubmitEdit(newData) {
		return this.props.dispatch(productActions.postEditProduct(this.props.data, newData, this.props.index))
	}
}

const mapStateToProps = (state, props) => {
	const prodID = props.match.params.id
	const index = state.products.data.findIndex(prod => String(prod.id) === prodID)
	return {
		ui: state.products.ui,
		data: state.products.data[index],
		index: index,
	}
}

export default withRouter(connect(mapStateToProps)(ProductPage))