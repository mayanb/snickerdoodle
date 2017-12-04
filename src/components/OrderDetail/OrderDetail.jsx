import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import {Dialog} from '../OldComponents/Dialog.jsx'
import Button from '../Card/Button'
import * as actions from './OrderDetailActions'
import OrderDetailHeader from './OrderDetailHeader'
import OrderDetailAttribute from './OrderDetailAttribute'
import OrderDetailContact from './OrderDetailContact'
import OrderInventoryUnitItem from './OrderInventoryUnitItem'
import OrderItemListItem from './OrderItemListItem'
import PaginatedTable from '../PaginatedTable/PaginatedTable'
import OrderDetailListHeader from './OrderDetailListHeader'

let dialogs = {
  deleteTask: {
    title: "Are you sure you want to delete this task?",
    text: "You can't undo this action.",
    okText: "Yes, I'm sure"
  }
}

function titleRow() {
  return <OrderInventoryUnitItem header item={{name: "Name", amount_description: "Amount",}} />
}
function titleRowOrderItem() {
  return <OrderItemListItem header item={{item: {id: "Item"}, amount: "Amount",}} />
}

class OrderDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      packingOrder: null,
    }
    this.handleBackButton = this.handleBackButton.bind(this)
    this.handlePagination = this.handlePagination.bind(this)
    this.handleOnClick = this.handleOnClick.bind(this)

  }

  componentWillMount() {
  }

  componentDidMount() {
    let id = this.props.match.params.id
    console.log(id)
    this.props.dispatch(actions.getPackingOrder(id))
    this.props.dispatch(actions.getOrderItems(id))
  }


  render() {
    let { packingOrder, orderItems } = this.props
    console.log(packingOrder)
    if (packingOrder.ui.isFetchingData || !packingOrder || !packingOrder.data || packingOrder.data.length == 0) {
      return <div>Loading</div>
    }
    return (
      <div className="order-detail">
        <Button link onClick={this.handleBackButton}>Back to all packing orders</Button>
        <OrderDetailHeader />
        <OrderDetailAttribute name="Placed at " value={packingOrder.data.created_at}></OrderDetailAttribute>
        <OrderDetailContact value={packingOrder.data.ordered_by} isFetchingData={packingOrder.ui.isFetchingData}></OrderDetailContact>
        <OrderDetailListHeader heading={"Items Ordered"}></OrderDetailListHeader>
        <PaginatedTable 
            data={this.props.packingOrder.data.order_inventory_units}
            ui={this.props.packingOrder.ui}
            onPagination={this.handlePagination} 
            Row={OrderInventoryUnitItem}
            TitleRow={titleRow}
            onClick={this.handleOnClick}
          />
        <OrderDetailListHeader heading={"Items Scanned"}></OrderDetailListHeader>
        <PaginatedTable 
            {...this.props.orderItems}
            onPagination={this.handlePaginationOrderItems} 
            Row={OrderItemListItem}
            TitleRow={titleRowOrderItem}
            onClick={this.handleOnClick}
          />
      </div>
    )
  }

  handleOnClick(index) {
    console.log("hi")
  }

  // MARK: EVENT HANDLERS
  handleBackButton() {
    window.location.href = window.location.origin + '/packingorders'
  }

  deletePackingOrder() {
    this.props.dispatch(actions.deletePackingOrder(this.props.data.packingOrder))
  }

  handlePagination(direction) {
    this.props.dispatch(actions.pagePackingOrder(direction))
  }

  handlePaginationOrderItems(direction) {
    this.props.dispatch(actions.pageOrderItems(direction))
  }
 
}

const mapStateToProps = (state/*, props*/) => {
  return {
    packingOrder: state.packingOrder,
    orderItems: state.orderItems
  }
}
const connectedOrderDetail = connect(mapStateToProps)(OrderDetail)
export default connect(mapStateToProps)(connectedOrderDetail)

