import React from 'react'
import { connect } from 'react-redux'
import * as actions from './ProcessesActions.jsx'

import PaginatedTable from '../PaginatedTable/PaginatedTable'
import ProcessListItem from './ProcessListItem'

import CreateProcessDropdown from './CreateProcessDropdown'

function titleRow() {
  return <ProcessListItem header item={{code: "ID", name: "Name", unit: "Unit"}} />
}

class Processes extends React.Component {
  constructor(props) {
    super(props)
  }

  // fetch products on load
  componentDidMount() {
    this.props.dispatch(actions.fetchProcesses())
  }

  render() {
    var { items, ui } = this.props

    return (
      <div className="nav-section processes">
        <div className="nav-section-list">
          { this.renderTitle() }
          <PaginatedTable 
            {...this.props}
            onClick={this.handleSelectProduct} 
            onPagination={this.handlePagination} 
            Row={ProcessListItem}
            TitleRow={titleRow}
          />
        </div>
        <div />
      </div>
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
          <CreateProcessDropdown />
        </div>
      </div>
    )
  }

  /* EVENT HANDLERS */
  handlePagination(direction) {
    this.props.dispatch(actions.pageProcesses(direction))
  }

}

// This is our select function that will extract from the state the data slice we want to expose
// through props to our component.
const mapStateToProps = (state/*, props*/) => {
  console.log(state)
  return {
    items: state.processes.items,
    ui: state.processes.ui,
  }
}

const connectedProcesses = connect(mapStateToProps)(Processes)

export default connectedProcesses
