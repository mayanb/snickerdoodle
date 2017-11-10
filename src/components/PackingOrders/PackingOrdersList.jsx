import React from 'react'
import { connect } from 'react-redux'
import PaginatedTable from '../PaginatedTable/PaginatedTable'
import PackingOrdersTitle from './PackingOrdersTitle'
import PackingOrdersListRow from './PackingOrdersListRow'
import PackingOrdersListRowHeader from './PackingOrdersListRowHeader'
import * as actions from './PackingOrdersActions'

class PackingOrdersList extends React.Component {
  render() {
    return (
      <div className="nav-section processes">
        <div className="nav-section-list">
          <PackingOrdersTitle />
          <PaginatedTable 
            {...this.props.packingOrders} 
            onPagination={this.handlePagination} 
            Row={PackingOrdersListRow}
            TitleRow={PackingOrdersListRowHeader}
          />
        </div>
      </div>
    )
  }

  handlePagination(direction) {
    this.props.dispatch(actions.pagePackingOrders(direction))
  }
}

// This is our select function that will extract from the state the data slice we want to expose
// through props to our component.
const mapStateToProps = (state/*, props*/) => {
  console.log(state)
  return {
    packingOrders: state.packingOrders,
  }
}

export default connect(mapStateToProps)(PackingOrdersList)