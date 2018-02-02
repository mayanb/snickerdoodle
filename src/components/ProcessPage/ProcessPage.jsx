import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../Processes/ProcessesActions'
import ProductsArchiveDialog from '../Products/ProductsArchiveDialog'
import * as processActions from '../Processes/ProcessesActions'
import ProcessesCard from './ProcessesCard'
import '../ProductPage/styles/productpage.css'
import { withRouter } from 'react-router-dom'
import './styles/processpage.css'

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
			<div className="process-page">
				<ProcessesCard
					process={data}
					onArchive={() => this.setState({ isArchiveOpen: true, archivingObjectIndex: ui.selectedItem })}
				/>
				{this.renderArchiveDialog(data, dispatch, history)}
			</div>
		)
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