import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { ElementHeader, ElementContent } from '../Element/Element'
import ArchiveDialog from '../ArchiveDialog/ArchiveDialog'
import * as productActions from '../Products/ProductsActions'
import ProductInformation from '../ProductPage/ProductInformation'
import RecipeList from '../RecipeList/RecipeList'
import './styles/productpage.css'

class ProductPage extends React.Component {
	constructor(props) {
		super(props)
		this.state ={
			isArchiveOpen: false,
			isArchiving: false,
		}
		
		this.handleArchive = this.handleArchive.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}

	componentDidMount() {
		let { id } = this.props.match.params
		this.props.dispatch(productActions.fetchProducts({ id: id }))
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
					<ProductInformation
						product={data}
						onArchive={this.handleArchive}
						onChange={this.handleChange}
						isSavingEdit={ui.isEditingItem}
					/>
					<div className="product-page-recipe-list">
						<RecipeList product={data} />
					</div>
				</ElementContent>
				{this.renderArchiveDialog()}
			</div>
		)
	}
	
	renderArchiveDialog() {
		if (!this.state.isArchiveOpen) {
			return null
		}
		
		return (
			<ArchiveDialog
				{...this.props.data}
				isArchiving={this.state.isArchiving}
				onCancel={this.handleCancelArchive.bind(this)}
				onSubmit={() => this.handleConfirmArchive()}
			/>
		)
	}
	
	handleArchive() {
		this.setState({ isArchiveOpen: true })
	}
	
	handleCancelArchive() {
		this.setState({isArchiveOpen: false})
	}
	
	handleConfirmArchive() {
		if (this.state.isArchiving) {
			return
		}
		
		this.setState({isArchiving: true})
		this.props.dispatch(productActions.postDeleteProduct(this.props.data, this.props.index))
			.then(() => {
				this.setState({ isArchiving: false, isArchiveOpen: false })
				this.props.history.push('/products')
			})
			.catch(e => console.log(e))
	}
	
	handleChange(newData) {
		return this.props.dispatch(productActions.postEditProduct(newData, this.props.index, this.props.data.id))
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