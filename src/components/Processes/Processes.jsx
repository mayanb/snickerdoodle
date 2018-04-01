import React from 'react'
import { connect } from 'react-redux'
import * as actions from './ProcessesActions.jsx'
import ObjectList from '../ObjectList/ObjectList'
import ObjectListHeader from '../ObjectList/ObjectListHeader'
import PaginatedTable from '../PaginatedTable/PaginatedTable'
import ProcessesListItem from './ProcessesListItem'
import CreateProcessDialog from './CreateProcessDialog'
import DuplicateProcessDialog from './DuplicateProcessDialog'
import './styles/processes.css'
import ApplicationSectionHeaderWithButton from '../Application/ApplicationSectionHeaderWithButton'
import ArchiveDialog from '../ArchiveDialog/ArchiveDialog'

class Processes extends React.Component {
  constructor(props) {
	super(props)

	this.state = {
		isAddingProcess: false,
		isArchiveOpen: false,
		isArchiving: false,
		archivingObjectIndex: null,
		isDuplicateOpen: false,
		isDuplicating: false,
		duplicatingObjectIndex: null,
	}

	this.handleSelectProcess = this.handleSelectProcess.bind(this)
	this.handlePagination = this.handlePagination.bind(this)
	this.handleToggleDialog = this.handleToggleDialog.bind(this)
	this.handleCreateProcess = this.handleCreateProcess.bind(this)
	this.handleArchive = this.handleArchive.bind(this)
	this.handleDuplicate = this.handleDuplicate.bind(this)
  }

  // fetch products on load
  componentDidMount() {
	this.props.dispatch(actions.fetchProcesses())
  }

  render() {
	var { users } = this.props
	let account_type = users.data[users.ui.activeUser].user.account_type
	if (account_type !== 'a')
		this.props.history.push('/')

	return (
		<div className="processes-container">
			<ApplicationSectionHeaderWithButton onToggleDialog={this.handleToggleDialog} buttonText="Create process" title="Processes"/>
			<ObjectList className="processes" isFetchingData={this.props.ui.isFetchingData}>
				<PaginatedTable
					{...this.props}
					onClick={this.handleSelectProcess}
					onPagination={this.handlePagination}
					Row={ProcessesListItem}
					TitleRow={this.renderHeaderRow}
					extra={{onArchive: this.handleArchive, onDuplicate: this.handleDuplicate}}
				/>
				{this.renderDialog()}
				{this.renderArchiveDialog()}
				{this.renderDuplicateDialog()}
			</ObjectList>
		</div>
	)
  }

  // this.handleSelectProcess

	renderDialog() {
		return (
			<CreateProcessDialog
				isOpen={this.state.isAddingProcess}
				onToggle={this.handleToggleDialog}
				onCreate={this.handleCreateProcess}
			/>
		)
	}

	renderHeaderRow() {
		return (
			<ObjectListHeader>
				<div className="icon"></div>
				<div className="code">Code</div>
				<div className="name">Name</div>
				<div className="description">Description</div>
				<div className="default-amount">Default Amount</div>
				<div className="last-used">Last Used</div>
				<div className="owner">Created by</div>
				<div className="date">Date Created</div>
				<div className="create-button"></div>
			</ObjectListHeader>
		)
	}

	renderArchiveDialog() {
		if (!this.state.isArchiveOpen)
			return null

		return (
			<ArchiveDialog
				{...process}
				onCancel={this.handleCancelArchive.bind(this)}
				onSubmit={() => this.handleConfirmArchive()}
			/>
		)
	}

	renderDuplicateDialog() {
		if (!this.state.isDuplicateOpen)
			return null
		return (
			<DuplicateProcessDialog
				isOpen={this.state.isDuplicateOpen}
				onToggle={this.handleCancelDuplicate.bind(this)}
				onCreate={this.handleCreateProcess}
			/>
			
		)
	}


  /* EVENT HANDLERS */

  	handleCreateProcess(newProcess) {
	  	this.props.dispatch(actions.postCreateProcess(newProcess))
		  	.then((res) => {
			  	let index = this.props.data.findIndex((e, i, a) => e.id === res.item.id)
			  	return this.handleSelectProcess(index)
		  	})
  	}

  	handlePagination(direction) {
		this.props.dispatch(actions.pageProcesses(direction))
  	}

  	handleSelectProcess(index) {
	  	this.props.history.push('/processes/' + this.props.data[index].id)
  	}

	handleToggleDialog() {
		this.setState({isAddingProcess: !this.state.isAddingProcess})
	}

	handleArchive() {
		// console.log("processId")
		// console.log(index)
		this.setState({ isArchiveOpen: true, archivingObjectIndex: 4 })
	}

	handleDuplicate() {
		this.setState({ isDuplicateOpen: true, duplicatingObjectIndex: 5})
	}

	handleCancelArchive() {
		this.setState({isArchiveOpen: false})
	}

	handleCancelDuplicate() {
		this.setState({isDuplicateOpen: false})
	}

	handleConfirmArchive() {
		this.setState({isArchiving: true})
		// dispatch(actions.postDeleteProcess(process, null, function () {
		// 		history.push('/processes')
		// 	})
		// )
	}


}

// This is our select function that will extract from the state the data slice we want to expose
// through props to our component.
const mapStateToProps = (state/*, props*/) => {
  return {
	data: state.processes.data,
	ui: state.processes.ui,
	inventoryData: state.inventories.data,
	users: state.users
  }
}

const connectedProcesses = connect(mapStateToProps)(Processes)

export default connectedProcesses
