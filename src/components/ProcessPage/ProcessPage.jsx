import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../Processes/ProcessesActions'
import ArchiveDialog from '../ArchiveDialog/ArchiveDialog'
import * as processActions from '../Processes/ProcessesActions'
import ProcessesCard from './ProcessesCard'
import '../ProductPage/styles/productpage.css'
import { withRouter } from 'react-router-dom'
import './styles/processpage.css'
import Loading from '../Loading/Loading'


class ProcessPage extends React.Component {
	constructor(props) {
		super(props)
		this.state ={
			isArchiveOpen: false,
			isArchiving: false,
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
				<Loading isfetchingData={this.state.isArchiving}>
					<ProcessesCard
						process={data}
						onArchive={() => this.handleArchive(ui.selectedItem)}
					/>
					{this.renderArchiveDialog(data, dispatch, history)}
				</Loading>
			</div>
		)
	}

	renderArchiveDialog(process, dispatch, history) {
		if (!this.state.isArchiveOpen)
			return null

		return (
			<ArchiveDialog
				{...process}
				onCancel={this.handleCancelArchive.bind(this)}
				onSubmit={() => this.handleConfirmArchive(process, dispatch, history)}
			/>
		)
	}

	handleArchive(processId) {
		console.log("processId")
		this.setState({ isArchiveOpen: true, archivingObjectIndex: processId })
	}

	handleCancelArchive() {
		this.setState({isArchiveOpen: false})
	}

	handleConfirmArchive(process, dispatch, history) {
		this.setState({isArchiving: true})
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