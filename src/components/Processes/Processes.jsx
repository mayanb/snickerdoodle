import React from 'react'
import { connect } from 'react-redux'
import pluralize from 'pluralize'
import * as actions from './ProcessesActions.jsx'
import ObjectList from '../ObjectList/ObjectList'
import ObjectListHeader from '../ObjectList/ObjectListHeader'
import PaginatedTable from '../PaginatedTable/PaginatedTable'
import ProcessesListItem from './ProcessesListItem'
import CreateOrDuplicateProcessDialog from './CreateOrDuplicateProcessDialog'
import './styles/processes.css'
import ApplicationSectionHeaderWithButton from '../Application/ApplicationSectionHeaderWithButton'
import ZeroState from '../ObjectList/ObjectListZeroState'
import { Modal, message } from 'antd'
import ElementFilter from '../Element/ElementFilter'

const { confirm } = Modal

class Processes extends React.Component {
  constructor(props) {
	super(props)

	this.state = {
		isAddingProcess: false,
		isDuplicateOpen: false,
		isAnnouncementOpen: true, // but will return null if already seen
		isDuplicating: false,
		duplicatingObjectIndex: null,
		filter: null,
		ordering: 'name',
	}

		this.renderHeaderRow = this.renderHeaderRow.bind(this)

		this.handleFilter = this.handleFilter.bind(this)
		this.handleSelectProcess = this.handleSelectProcess.bind(this)
		this.handlePagination = this.handlePagination.bind(this)
		this.handleToggleDialog = this.handleToggleDialog.bind(this)
		this.handleCreateProcess = this.handleCreateProcess.bind(this)
		this.handleArchive = this.handleArchive.bind(this)
		this.handleDuplicate = this.handleDuplicate.bind(this)
		this.handleDuplicateProcess = this.handleDuplicateProcess.bind(this)
	  this.handleReorder = this.handleReorder.bind(this)
  }

  // fetch products on load
  componentDidMount() {
  	this.fetchProcesses()
  }

  fetchProcesses() {
	  const { ordering, filter } = this.state
	  const params = {}
	  if (ordering) {
		  params['ordering'] = ordering
	  }
	  if (filter) {
		  params['filter'] = filter
	  }
	  this.props.dispatch(actions.fetchProcesses(params))
  }

  render() {
		var { users, ui, data } = this.props
		let account_type = users.data[users.ui.activeUser].user.account_type
		if (account_type !== 'a') {
			this.props.history.push('/')
		}

		let hasNone = !ui.isFetchingData && (!data || !data.length) && !this.state.filter
		return (
			<div className="processes-container">
				<ApplicationSectionHeaderWithButton onToggleDialog={this.handleToggleDialog} buttonText="Create process" title="Processes"/>
					{ hasNone ? <ZeroState type="process" /> : this.renderTable() }
					{this.renderDialog()}
					{this.renderDuplicateDialog()}
			</div>
		)
  }

  renderTable() {
  	let { ui } = this.props
  	return (
  		<div>
  		<ElementFilter className="process-filter" onChange={this.handleFilter}/>
  		<ObjectList className="processes" isFetchingData={ui.isFetchingData}>
				<PaginatedTable
					{...this.props}
					onClick={this.handleSelectProcess}
					onPagination={this.handlePagination}
					Row={ProcessesListItem}
					TitleRow={this.renderHeaderRow}
					extra={{onArchive: this.handleArchive, onDuplicate: this.handleDuplicate}}
				/>
			</ObjectList>
			</div>
  	)
  }

	renderDialog() {
		return (
			<CreateOrDuplicateProcessDialog
				isOpen={this.state.isAddingProcess}
				onToggle={this.handleToggleDialog}
				onSubmit={this.handleCreateProcess}
				title='Create process'
				className='create-process-dialog'
				submitButtonText='Create new process'
			/>
		)
	}

	renderHeaderRow() {
  	const columns = [
		  { title: null, className: 'icon', field: null },
		  { title: 'Code', className: 'code', field: 'code' },
		  { title: 'Name', className: 'name', field: 'name' },
		  { title: 'Category', className: 'category', field: 'category' },
		  { title: 'Default amount', className: 'default-amount', field: 'default_amount' },
		  { title: 'Last used', className: 'last-used', field: 'last_used' },
		  { title: 'Created by', className: 'owner', field: null },
		  { title: 'Date created', className: 'date', field: 'created_at' },
		  { title: null, className: 'more-options-button', field: null },
	  ]

		return (
			<ObjectListHeader
				columns={columns}
				onReorder={this.handleReorder}
				ordering={this.state.ordering}
			/>
		)
	}

	handleReorder(ordering) {
  	this.setState({ordering: ordering}, this.fetchProcesses)
	}


	handleArchive(index) {
		let p = this.props.data[index]
		confirm({
			title: `Are you sure you want to delete (${p.code}) ${p.name}?`,
    	content: `This will not affect old tasks, but your team will not be able to create new tasks with this process type.`,
    	okText: `Yes, I'm sure`,
    	okType: 'danger',
    	cancelText: 'Cancel',
    	onOk: () => this.handleConfirmArchive(index),
		})
	}

	renderDuplicateDialog() {
		if (!this.state.isDuplicateOpen) {
			return null
		}

		return (
			<CreateOrDuplicateProcessDialog
				isOpen={this.state.isDuplicateOpen}
				onToggle={this.handleCancelDuplicate.bind(this)}
				onSubmit={this.handleDuplicateProcess}
				isDuplicating={this.state.isDuplicating}
				title='Duplicate a process'
				className='create-process-dialog'
				submitButtonText='Create new process with these same fields'
			/>
			
		)
	}


  /* EVENT HANDLERS */

  handleFilter(filterText) {
  	this.setState({ filter: filterText }, this.fetchProcesses)
  }

	handleCreateProcess(newProcess) {
		newProcess.unit = pluralize.singular(newProcess.unit)
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

	handleDuplicate(index) {
		this.setState({ isDuplicateOpen: true, duplicatingObjectIndex: index})
	}

	handleCancelArchive() {
		this.setState({isArchiveOpen: false})
	}

	handleCancelDuplicate() {
		this.setState({isDuplicateOpen: false})
	}

	handleConfirmArchive(index) {
		let p = this.props.data[index]
		return this.props.dispatch(actions.postDeleteProcess(p, index))
			.catch(e => {
				message.error(`Oops! We couldn't delete ${p.name} (${p.code}). Try again later.`)
			})
	}

	handleDuplicateProcess(newProcess) {
		if (this.state.isDuplicating) {
			return 
		}
		let p = this.props.data[this.state.duplicatingObjectIndex]
		let json = newProcess
		json.unit = pluralize.singular(json.unit)
		json["duplicate_id"] = p.id
		this.setState({isDuplicating: true})
		this.props.dispatch(actions.postDuplicateProcess(json))
			.then((res) => {
				this.setState({isDuplicating: false, isDuplicateOpen: false})
				let index = this.props.data.findIndex((e, i, a) => e.id === res.item.id)
				return this.handleSelectProcess(index)
			})
	}
}


// This is our select function that will extract from the state the data slice we want to expose
// through props to our component.
const mapStateToProps = (state/*, props*/) => {
  return {
	data: state.processes.data,
	ui: state.processes.ui,
	users: state.users
  }
}

const connectedProcesses = connect(mapStateToProps)(Processes)

export default connectedProcesses
