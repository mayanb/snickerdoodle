import React from 'react'
import { connect } from 'react-redux'
import * as actions from './ProcessesActions.jsx'
import * as inventoryActions from '../Inventory/InventoryActions'
import PaginatedTable from '../PaginatedTable/PaginatedTable'
import ProcessListItem from './ProcessListItem'
import ProcessesCard from './ProcessesCard'
import ProductsArchiveDialog from '../Products/ProductsArchiveDialog'
import CreateProcessDropdown from './CreateProcessDropdown'
import ProcessesList from './ProcessesList'
import './styles/processes.css'

class Processes extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isArchiveOpen: false, 
      archivingObjectIndex: -1, 
    }

    this.handleSelectProcess = this.handleSelectProcess.bind(this)
    this.handlePagination = this.handlePagination.bind(this)
    this.handleCreateProcess = this.handleCreateProcess.bind(this)
    this.handleArchiveProcess = this.handleArchiveProcess.bind(this)
    this.toggleArchive = this.toggleArchive.bind(this)

  }

  // fetch products on load
  componentDidMount() {
    this.props.dispatch(actions.fetchProcesses())
  }

  render() {
    var { data, ui, users } = this.props
    let account_type = users.data[users.ui.activeUser].user.account_type
    if (account_type != 'a')
      return null
    return (
	    <div className="processes">
		    {this.renderTitle()}
		    <div className="nav-section">
			    <ProcessesList
				    {...this.props}
				    onSelect={this.handleSelectProcess}
				    onPagination={this.handlePagination}
			    />
			    <div>
				    <ProcessesCard
					    {...this.props}
					    onArchive={() => this.setState({ isArchiveOpen: true, archivingObjectIndex: ui.selectedItem })} />
			    </div>
			    {this.renderArchiveDialog(data, ui)}
		    </div>
	    </div>
    )
  }

  renderArchiveDialog(data, ui) {
    if (!this.state.isArchiveOpen)
      return null

    return (
      <ProductsArchiveDialog 
        {...data[this.state.archivingObjectIndex]} 
        onCancel={this.toggleArchive}
        onSubmit={() => this.handleArchiveProcess(this.state.archivingObjectIndex)}
      />
    )
  }

  renderTitle() {
    return (
      <div className="nav-section-header processes-header">
        <h1>Processes</h1>
        { this.renderCreateProductButton() }
      </div>
    )
  }

  renderCreateProductButton() {
    return (
      <div>
        <div className="products-create-product">
          <CreateProcessDropdown onSubmit={this.handleCreateProcess}/>
        </div>
      </div>
    )
  }

  /* EVENT HANDLERS */

  toggleArchive() {
    this.setState({isArchiveOpen: !this.state.isArchiveOpen})
  }

  handleCreateProcess(newProcess) {
	  this.props.dispatch(actions.postCreateProcess(newProcess))
		  .then((res) => {
			  let index = this.props.data.findIndex((e, i, a) => e.id === res.item.id)
			  this.props.dispatch(actions.selectProcess(index))
		  })
  }

  handlePagination(direction) {
    this.props.dispatch(actions.pageProcesses(direction))
  }

  handleSelectProcess(index) {

    let p = this.props.data[index]
    if (!p) 
      return 

    this.props.dispatch(actions.selectProcess(index))
    this.props.dispatch(inventoryActions.fetchInventory({processes: p.id}))
  }

  handleArchiveProcess(index) {
    let newIndex = index
    if ( newIndex == this.props.data.length - 1)
      newIndex = index - 1

    let p = this.props.data[index]
    let c = this

    this.props.dispatch(actions.postDeleteProcess(p, index, function () {
        c.handleSelectProcess(index)
        c.toggleArchive()
      })
    )
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
