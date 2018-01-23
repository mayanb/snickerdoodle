import React from 'react'
import { connect } from 'react-redux'
import Icon from '../Card/Icon'
import * as actions from '../ProductPage/ProductFormulaActions'
import * as productActions from '../Products/ProductsActions'
import * as processActions from '../Processes/ProcessesActions'
import ProductFormulaSection from '../ProductPage/ProductFormulaSection'
import ProcessesCard from './ProcessesCard'
import ProductMenu from '../ProductPage/ProductMenu'
import AddSection from '../ProductPage/AddSection'
import '../ProductPage/styles/productpage.css'

class ProcessPage extends React.Component {

	componentDidMount() {
		let { id } = this.props.match.params
		this.props.dispatch(processActions.fetchProcesses({ id: id }))
	}

	render() {
		let { ui, data, dispatch } = this.props

		console.log('props', this.props)

		if (!data) {
			return <span>Loading... </span>
		}

		return (
			<div className="productpage">
				<ProcessesCard process={data} />
			</div>
		)
	}

	renderAddSection(exclude) {
		let { ui, product } = this.props
		if (ui.isAddingSection) {
			return <ProductFormulaSection
				process_type={ui.isAddingSection}
				product_type={product.id}
				formulas={[]}
				isAddingFormula={true}
			/>
		} else return <AddSection exclude={exclude} />
	}
}

function ProcessHeader(props) {
	return (
		<div className="productheader">
			<Icon size="44px" content={props.process.code} />
			<div>
				<span className="product-code">{props.process.code}</span>
				<span className="product-name">{props.process.name}</span>
			</div>
			<ProductMenu product={props.product} dispatch={props.dispatch} />
		</div>
	)
}

const mapStateToProps = (state/*, props*/) => {
	return {
		ui: state.formulas.ui,
		data: state.processes.data[0],
		dispatch: state.dispatch
	}
}

export default connect(mapStateToProps)(ProcessPage)