import React from 'react'
import { connect } from 'react-redux'
import { ElementHeader, ElementContent } from '../Element/Element'
import * as productActions from '../Products/ProductsActions'
import { withRouter } from 'react-router-dom'
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
	}

	componentDidMount() {
		let { id } = this.props.match.params
		this.props.dispatch(productActions.fetchProducts({ id: id }))
	}

	render() {
		let { data, history } = this.props

		if (!data) {
			return null
		}

		return (
			<div className="product-page">
				<ElementHeader title={'Products'} name={data && data.name} onBack={() => history.push('/products')} />
				<ElementContent>
					<ProductInformation product={data} />
					<div className="product-page-recipe-list">
						<RecipeList product={data} />
					</div>
				</ElementContent>
			</div>
		)
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