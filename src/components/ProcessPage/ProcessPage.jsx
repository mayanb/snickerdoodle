import React from 'react'
import { connect } from 'react-redux'
import { Modal, message } from 'antd'
import * as actions from '../Processes/ProcessesActions'
import { ElementHeader, ElementContent } from '../Element/Element'
import * as processActions from '../Processes/ProcessesActions'
import ProcessInformation from './ProcessInformation'
import ProcessAttributeList from '../ProcessAttribute/ProcessAttributeList'
import { withRouter } from 'react-router-dom'
import './styles/processpage.css'
import Loading from '../Loading/Loading'
import CreateOrDuplicateProcessDialog from '../Processes/CreateOrDuplicateProcessDialog'

const { confirm } = Modal

class ProcessPage extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			isDuplicateOpen: false,
			isDuplicating: false,
		}
		this.handleArchive = this.handleArchive.bind(this)
		this.handleDuplicate = this.handleDuplicate.bind(this)
		this.handleDuplicateProcess = this.handleDuplicateProcess.bind(this)
		this.handleSubmitChange = this.handleSubmitChange.bind(this)
	}

	componentDidMount() {
		let { id } = this.props.match.params
		this.props.dispatch(processActions.fetchProcesses({ id: id }))
	}

	render() {
		let { data, history, ui } = this.props

		if (!data) {
			return <span>Loading... </span>
		}

		return (
			<div className="process-page">
				<ElementHeader title={'Processes'} name={data.name} onBack={() => history.push('/processes')} />
				<Loading isFetchingData={ui.isFetchingData}>
					<ElementContent>
						<ProcessInformation
							process={data}
							onArchive={this.handleArchive}
							onDuplicate={this.handleDuplicate}
							onSubmitChange={this.handleSubmitChange}
							isSavingEdit={ui.isEditingItem}
						/>
						<ProcessAttributeList process={data} />
					</ElementContent>
					{this.renderDuplicateDialog()}
				</Loading>
				{this.renderHelp()}
			</div>
		)
	}

	renderHelp() {
		return (
			<div className="help-container">
				<div className="help"
					onClick={() => window.open("https://polymer.helpscoutdocs.com/article/16-recurring-log-fields", '_blank')}>
					<div className="help-header">You can now fill in log fields multiple times!</div>
					<div>
						<span>We've added recurring log fields so your team can record multiple entries for each log field, and you can keep track of changes. </span>
						<span className="help-link">
							Learn how to get finer resolution over your production tracking now.
					</span>
						<span className="forward">  <i
							className="material-icons activity-page-forward-i">arrow_forward</i></span>
					</div>
				</div>
			</div>
		)
	}

	renderDuplicateDialog() {
		if (!this.state.isDuplicateOpen)
			return null
		return (
			<CreateOrDuplicateProcessDialog
				isOpen={this.state.isDuplicateOpen}
				onToggle={this.handleCancelDuplicate.bind(this)}
				onSubmit={this.handleDuplicateProcess}
				title='Duplicate a process'
				className='create-process-dialog'
				submitButtonText='Create new process with these same fields'
			/>

		)
	}

	handleArchive(index) {
		confirm({
			title: `Are you sure you want to delete ${this.props.data.name} (${this.props.data.code})?`,
			content: "Your old tasks will be unaffected, but you won't be able to make new tasks with this process type.",
			okText: 'Yes, I\'m sure',
			okType: 'danger',
			onOk: () => this.handleConfirmArchive(),
			onCancel: () => { }
		})
	}

	handleConfirmArchive() {
		let { dispatch, history, data, index } = this.props
		dispatch(actions.postDeleteProcess(data, index))
			.then(() => history.push('/processes'))
			.catch(e => {
				message.error(`Oops! We couldn't delete ${data.name} (${data.code}). Try again later.`)
			})
	}

	handleDuplicate(index) {
		this.setState({ isDuplicateOpen: true })
	}

	handleCancelDuplicate() {
		this.setState({ isDuplicateOpen: false })
	}

	handleDuplicateProcess(newProcess) {
		if (this.state.isDuplicating) {
			return
		}
		let p = this.props.data
		let json = newProcess
		json["duplicate_id"] = p.id
		this.setState({ isDuplicating: true })
		this.props.dispatch(actions.postDuplicateProcess(json))
			.then((res) => {
				this.setState({ isDuplicating: false, isDuplicateOpen: false })
				this.props.history.push('/processes/' + res.item.id)
			})
	}

	handleSubmitChange(newData) {
		return this.props.dispatch(actions.editProcess(newData, this.props.index, this.props.data.id))
	}
}

const mapStateToProps = (state, props) => {
	const processId = props.match.params.id
	const index = state.processes.data.findIndex(process => String(process.id) === processId)
	return {
		ui: state.processes.ui,
		data: state.processes.data[index],
		index: index,
		dispatch: state.dispatch
	}
}

export default withRouter(connect(mapStateToProps)(ProcessPage))