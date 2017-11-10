import React from 'react'
import { connect } from 'react-redux'
import PaginatedTable from '../PaginatedTable/PaginatedTable'
import PackingOrdersTitle from './PackingOrdersTitle'
import PackingOrdersListRow from './PackingOrdersListRow'
import PackingOrdersListRowHeader from './PackingOrdersListRowHeader'

class PackingOrdersList extends React.Component {
  render() {
    return (
      <div className="nav-section processes">
        <div className="nav-section-list">
          <PackingOrdersTitle />
          <PaginatedTable 
            {...this.props} 
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

export default connect(PackingOrdersList)