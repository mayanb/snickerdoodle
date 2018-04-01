import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../Processes/ProcessesActions'
import ProcessPageHeader from './ProcessPageHeader'
import ArchiveDialog from '../ArchiveDialog/ArchiveDialog'
import * as processActions from '../Processes/ProcessesActions'
import ProcessInformation from './ProcessInformation'
import ProcessAttributeList from '../ProcessAttribute/ProcessAttributeList'
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
		this.handleArchive = this.handleArchive.bind(this)
	}

	componentDidMount() {
		let { id } = this.props.match.params
		this.props.dispatch(processActions.fetchProcesses({ id: id }))
	}

	render() {
		let { data, dispatch, history } = this.props

		if (!data) {
			return <span>Loading... </span>
		}

		return (
			<div className="process-page">
				<ProcessPageHeader processName={data.name}/>
				<Loading isfetchingData={this.state.isArchiving}>
					<div className="process-page-content">
						<ProcessInformation {...data} onArchive={this.handleArchive}/>
						<ProcessAttributeList process={data} />
					</div>
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
		this.props.dispatch(actions.postDeleteProcess(this.props.data, this.props.index))
			.then(() => {
				this.setState({ isArchiving: false, isArchiveOpen: false })
				this.props.history.push('/processes')
			})
	}
}

const mapStateToProps = (state, props) => {
	const processId = props.match.params.id
	const index = state.processes.data.findIndex(process => String(process.id) === processId)
	return {
		ui: state.formulas.ui,
		data: state.processes.data[index],
		index: index,
		dispatch: state.dispatch
	}
}

export default withRouter(connect(mapStateToProps)(ProcessPage))