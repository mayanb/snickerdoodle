import React from 'react'
import { connect } from 'react-redux'
import Icon from '../Card/Icon'
import * as actions from '../Processes/ProcessesActions'
import * as productActions from '../Products/ProductsActions'
import ProductsArchiveDialog from '../Products/ProductsArchiveDialog'
import * as processActions from '../Processes/ProcessesActions'
import ProductFormulaSection from '../ProductPage/ProductFormulaSection'
import ProcessesCard from './ProcessesCard'
import ProductMenu from '../ProductPage/ProductMenu'
import AddSection from '../ProductPage/AddSection'
import '../ProductPage/styles/productpage.css'
import { withRouter } from 'react-router-dom'

class ProcessPage extends React.Component {
	constructor(props) {
		super(props)
		this.state ={
			isArchiveOpen: false
		}
	}

	componentDidMount() {
		let { id } = this.props.match.params
		this.props.dispatch(processActions.fetchProcesses({ id: id }))
	}

	render() {
		let { ui, data, dispatch, history } = this.props

		if (!data) {
			return <span>Loading... </span>
		}

		return (
			<div className="productpage">
				<ProcessesCard
					process={data}
					onArchive={() => this.setState({ isArchiveOpen: true, archivingObjectIndex: ui.selectedItem })}
				/>
				{this.renderArchiveDialog(data, dispatch, history)}
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

	renderArchiveDialog(process, dispatch, history) {
		if (!this.state.isArchiveOpen)
			return null

		return (
			<ProductsArchiveDialog
				{...process}
				onCancel={this.toggleArchive}
				onSubmit={() => this.handleConfirmArchive(process, dispatch, history)}
			/>
		)
	}

	handleConfirmArchive(process, dispatch, history) {
		dispatch(actions.postDeleteProcess(process, null, function () {
				history.push('/processes')
			})
		)
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

const mapStateToProps = (state, props) => {
	const processId = props.match.params.id
	const process = state.processes.data.find(process => String(process.id) === processId)
	return {
		ui: state.formulas.ui,
		data: process,
		dispatch: state.dispatch
	}
}

export default withRouter(connect(mapStateToProps)(ProcessPage))