import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../Processes/ProcessesActions'
import ProcessPageHeader from './ProcessPageHeader'
import ArchiveDialog from '../ArchiveDialog/ArchiveDialog'
import * as processActions from '../Processes/ProcessesActions'
import ProcessInformation from './ProcessInformation'
import ProcessAttributeList from '../ProcessAttribute/ProcessAttributeList'
import { withRouter } from 'react-router-dom'
import './styles/processpage.css'
import Loading from '../Loading/Loading'
import CreateOrDuplicateProcessDialog from '../Processes/CreateOrDuplicateProcessDialog'


class ProcessPage extends React.Component {
	constructor(props) {
		super(props)
		this.state ={
			isArchiveOpen: false,
			isArchiving: false,
			editingBasicInfoOpen: false, // TEMPORARILY SET TO true FOR EASIER CODING (REMOVE)
			isSubmittingEdit: false,
			// formErrorsArray: [],
		}
		this.handleArchive = this.handleArchive.bind(this)
		this.handleDuplicate = this.handleDuplicate.bind(this)
		this.handleDuplicateProcess = this.handleDuplicateProcess.bind(this)
		this.handleInputChange = this.handleInputChange.bind(this)
		this.handleEditBasicInfoSubmit = this.handleEditBasicInfoSubmit.bind(this)

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
		
		// I'm just trying to set the local state once the Process has loaded
		if (this.state.name === undefined) {
			this.setState = {
				name: data.name,
				code: data.code,
				number: data.number,
				unit: data.unit,
				output_desc: data.output_desc,
			}
		}
		
		const { name, code, number, unit, output_desc, editingBasicInfoOpen } = this.state

		return (
			<div className="process-page">
				<ProcessPageHeader processName={name} onBack={() => history.push('/processes')}/>
				<Loading isfetchingData={this.state.isArchiving}>
					<div className="process-page-content">
						<ProcessInformation
							name={name}
							code={code}
							number={number}
							unit={unit}
							output_desc={output_desc}
							onArchive={this.handleArchive}
							onDuplicate={this.handleDuplicate}
							editingBasicInfoOpen={editingBasicInfoOpen}
							onSubmitBasicInfo={this.handleEditBasicInfoSubmit}
							onInputChange={this.handleInputChange}
						/>
						<ProcessAttributeList process={data} />
					</div>
					{this.renderArchiveDialog(data, dispatch, history)}
					{this.renderDuplicateDialog()}
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
				submitButtonText='Create new process with these same Fields'
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

	handleDuplicate(index) {
		this.setState({ isDuplicateOpen: true })
	}

	handleCancelDuplicate() {
		this.setState({isDuplicateOpen: false})
	}

	handleDuplicateProcess(newProcess) {
		if (this.state.isDuplicating) {
			return 
		}
		let p = this.props.data
		let json = newProcess
		json["duplicate_id"] = p.id
		this.setState({isDuplicating: true})
		this.props.dispatch(actions.postDuplicateProcess(json))
			.then((res) => {
				this.setState({isDuplicating: false, isDuplicateOpen: false})
				this.props.history.push('/processes/' + res.item.id)
			})
	}

	handleInputChange(e, key) {
		console.log('state', this.state)
		console.log('input change:', e.target.value, key)
		this.setState({ [key]: e.target.value })
	}
	
	handleEditBasicInfoSubmit() {
		if (!this.state.editingBasicInfoOpen) {
			// this.setState({ editingBasicInfoOpen: true })
			return
		} else if (this.state.isSubmittingEdit) {
			return
		}
		const { name, code, default_amount, unit, output_desc } = this.props.data
		const editedProcess = {
			name: name,
			code: code,
			default_amount: default_amount,
			unit: unit,
			output_desc: output_desc,
		}

		this.setState({isSubmittingEdit: true})
		console.log(editedProcess)
		this.props.dispatch(actions.editProcess(editedProcess, this.props.index, this.props.data.id))
			.then((res) => {
				console.log(res)
				this.setState({ isSubmittingEdit: false, editingBasicInfoOpen: false })
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