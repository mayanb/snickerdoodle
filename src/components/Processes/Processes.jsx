import React from 'react'
import { connect } from 'react-redux'
import * as actions from './ProcessesActions.jsx'
import * as inventoryActions from '../Inventory/InventoryActions'
import ObjectList from '../ObjectList/ObjectList'
import ObjectListHeader from '../ObjectList/ObjectListHeader'
import ObjectListTitle from '../ObjectList/ObjectListTitle'
import PaginatedTable from '../PaginatedTable/PaginatedTable'
import ProcessesListItem from './ProcessesListItem'
import CreateProcessDropdown from './CreateProcessDropdown'
import CreateProcessDialog from './CreateProcessDialog'
import './styles/processes.css'

class Processes extends React.Component {
  constructor(props) {
    super(props)

	  this.state = {
		  process: {
		  	name: '',
			  abbreviation: ''
		  },
		  isDialogOpen: false
	  }

    this.handleSelectProcess = this.handleSelectProcess.bind(this)
    this.handlePagination = this.handlePagination.bind(this)

	  this.handleToggleDialog = this.handleToggleDialog.bind(this)
	  this.handleCreateProcess = this.handleCreateProcess.bind(this)
	  this.handleNameProcess = this.handleNameProcess.bind(this)
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
		    <ObjectList className="processes" isFetchingData={this.props.ui.isFetchingData}>
			    {this.renderTitle()}
			    <PaginatedTable
				    {...this.props}
				    onClick={this.handleSelectProcess}
				    onPagination={this.handlePagination}
				    Row={ProcessesListItem}
				    TitleRow={this.renderHeaderRow}
			    />
			    {this.renderDialog()}
		    </ObjectList>
    )
  }

  renderTitle() {
    return (
	    <ObjectListTitle title="All processes" buttonText="Create process">
		    <CreateProcessDropdown
			    onSubmit={this.handleNameProcess}
			    ui={this.props.ui}
		    />
	    </ObjectListTitle>
    )
  }

	renderDialog() {
		return (
			<CreateProcessDialog
				name={this.state.process.name}
				code={this.state.process.abbreviation}
				isOpen={this.state.isDialogOpen}
				onToggle={this.handleToggleDialog}
				onCreate={this.handleCreateProcess}
			/>
		)
	}

	renderHeaderRow() {
		return (
			<ObjectListHeader>
				<div className="code">Code</div>
				<div className="name">Name</div>
				<div className="owner">Owner</div>
				<div className="date">Date Created</div>
			</ObjectListHeader>
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

  handleNameProcess(newProcess) {
	  this.setState({isDialogOpen: true, process: newProcess})
  }

  handlePagination(direction) {
    this.props.dispatch(actions.pageProcesses(direction))
  }

  handleSelectProcess(index) {
	  this.props.history.push('/processes/' + this.props.data[index].id)
  }

	handleToggleDialog() {
		this.setState({isDialogOpen: !this.state.isDialogOpen})
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
