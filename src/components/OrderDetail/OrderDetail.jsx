import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import {Dialog} from '../OldComponents/Dialog.jsx'
import Button from '../Card/Button'
import * as actions from './OrderDetailActions'
import OrderDetailHeader from './OrderDetailHeader'

let dialogs = {
  deleteTask: {
    title: "Are you sure you want to delete this task?",
    text: "You can't undo this action.",
    okText: "Yes, I'm sure"
  }
}

class OrderDetail extends React.Component {
  constructor(props) {
    super(props)

    this.handleBackButton = this.handleBackButton.bind(this)
  }

  componentWillMount() {
  }

  componentDidMount() {
    let id = this.props.match.params.id
    this.props.dispatch(actions.getPackingOrder(id))
  }


  render() {
    let { packingOrder } = this.props

    if (packingOrder.ui.isFetchingData) {
      return <div>Loading</div>
    }

    return (
      <div className="orderdetail">
        <Button link onClick={this.handleBackButton}>Back to all packing orders</Button>
        <OrderDetailHeader />
      </div>
    )
  }

  // MARK: EVENT HANDLERS
  handleBackButton() {
    window.location.href = window.location.origin + '/packingorders'
  }

  deletePackingOrder() {
    this.props.dispatch(actions.deletePackingOrder(this.props.data.packingOrder))
  }

 
}

const mapStateToProps = (state/*, props*/) => {
  return {
    packingOrder: state.packingOrder,
  }
}
export default connect(mapStateToProps)(OrderDetail)