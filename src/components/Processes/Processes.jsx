import React from 'react'
import { connect } from 'react-redux'
import * as actions from './ProcessesActions.jsx'

import PaginatedTable from '../PaginatedTable/PaginatedTable'
import ProcessListItem from './ProcessListItem'
import ProcessesCard from './ProcessesCard'
import ProductsArchiveDialog from '../Products/ProductsArchiveDialog'

import CreateProcessDropdown from './CreateProcessDropdown'

function titleRow() {
  return <ProcessListItem header item={{code: "ID", name: "Name", unit: "Unit"}} />
}

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
    var { data, ui } = this.props
    return (
      <div className="nav-section processes">
        <div className="nav-section-list">
          { this.renderTitle() }
          <PaginatedTable 
            {...this.props}
            onClick={this.handleSelectProcess} 
            onPagination={this.handlePagination} 
            Row={ProcessListItem}
            TitleRow={titleRow}
          />
        </div>

        <div>
          <ProcessesCard 
            {...this.props} 
            onArchive={() => this.setState({isArchiveOpen: true, archivingObjectIndex: ui.selectedItem})}/>
        </div>
        {this.renderArchiveDialog(data, ui)}
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
      <div className="nav-section-header">
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
    this.props.dispatch(actions.postCreateProcess(newProcess, (id) => {
      let index = this.props.data.findIndex((e, i, a) => e.id === id)
      this.props.dispatch(actions.selectProcess(index))
    }))
  }

  handlePagination(direction) {
    this.props.dispatch(actions.pageProcesses(direction))
  }

  handleSelectProcess(index) {
    let process = this.props.data[index]
    if (!process) 
      return 

    this.props.dispatch(actions.selectProcess(index))
    this.props.dispatch(actions.fetchProcessInventory(process))
  }

  handleArchiveProcess(index) {
    let newIndex = index
    if ( newIndex == this.props.data.length - 1)
      newIndex = index - 1

    let p = this.props.data[index]
    let c = this

    this.props.dispatch(actions.postDeleteProcess(p, index, function () {
        c.props.dispatch(actions.selectProcess(index))
        c.toggleArchive()
      })
    )
  }

  handleEditProduct(index) {
    
  }

}

// This is our select function that will extract from the state the data slice we want to expose
// through props to our component.
const mapStateToProps = (state/*, props*/) => {
  return {
    data: state.processes.data,
    ui: state.processes.ui,
    processInventoryData: state.processInventories.data
  }
}

const connectedProcesses = connect(mapStateToProps)(Processes)

export default connectedProcesses
