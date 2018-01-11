import React from 'react'
import ElementMenu from '../Element/ElementMenu'
import * as actions from '../Products/ProductsActions.jsx'
import ProductsArchiveDialog from '../Products/ProductsArchiveDialog'
import { withRouter } from 'react-router-dom'

class ProductMenu extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			isArchiveOpen: false
		}
	}

	render() {
		let { product, dispatch, history } = this.props

		return (<div>
				<ElementMenu
					onArchive={this.toggleArchive.bind(this)}
				/>
				{this.renderArchiveDialog(product, dispatch, history)}
			</div>
		)
	}

	renderArchiveDialog(product, dispatch, history) {
		if (!this.state.isArchiveOpen)
			return null

		return (
			<ProductsArchiveDialog
				{...product}
				onCancel={this.toggleArchive.bind(this)}
				onSubmit={() => handleConfirmArchive(product, dispatch, history)}
			/>
		)
	}

	toggleArchive() {
		this.setState({ isArchiveOpen: !this.state.isArchiveOpen })
	}

}

function handleConfirmArchive(product, dispatch, history) {
	dispatch(actions.postDeleteProduct(product, null, function () {
			history.push('/products')
		})
	)
}

export default withRouter(ProductMenu)
