import React from 'react'
import { connect } from 'react-redux'
import * as actions from './PackingOrdersActions.jsx'
import PackingOrdersList from './PackingOrdersList.jsx'
import PackingOrdersCreateDialog from '../PackingOrdersCreate/PackingOrdersCreateDialog'
import Button from '../Card/Button.jsx'
import PaginatedTable from '../PaginatedTable/PaginatedTable'
import PackingOrdersListItem from './PackingOrdersListItem'
import PackingOrdersListRowHeader from './PackingOrdersListRowHeader'
import PackingOrdersTitle from './PackingOrdersTitle'


function titleRow() {
  return <PackingOrdersListItem header item={{created_at: "Created At", ordered_by_name: "Ordered By", status: "Status"}} />
}

class PackingOrders extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      createPackingOrdersDialog: true,
    }

    this.handleSelectPackingOrder = this.handleSelectPackingOrder.bind(this)
    this.handlePagination = this.handlePagination.bind(this)
    this.handleViewPackingOrderDetails = this.handleViewPackingOrderDetails.bind(this)

  }

  toggleDialog(name) {
    this.setState({[name]: !this.state[name]})
  }

  componentDidMount() {
    this.props.dispatch(actions.fetchPackingOrders())
    this.props.dispatch(actions.fetchContacts())

  }


  render() {
  	let packingOrders = this.props.packingOrders
    let contacts = this.props.contacts
  	if (packingOrders.ui.isFetchingData) {
      return <div>hi</div>
    }

  	return(
      <div className="packing-orders-section">
        <Button onClick={() => this.toggleDialog("createPackingOrdersDialog")}>Create packing order</Button>
        <PackingOrdersTitle class="card-header" />
        <PaginatedTable 
            {...this.props.packingOrders}
            onClick={this.handleViewPackingOrderDetails} 
            onPagination={this.handlePagination} 
            Row={PackingOrdersListItem}
            TitleRow={titleRow}
          />
        {this.renderDialogs()}
      </div>

  	)
  }
  
  handleViewPackingOrderDetails(index) {
    console.log(this.props.packingOrders.data[index])
    let id = this.props.packingOrders.data[index].id
    window.location = window.location.origin + "/orders/" + id
  }


  handleCreatePackingOrder(data) {
    this.props.dispatch(actions.postCreatePackingOrder(data, (id) => {
      let index = this.props.packingOrders.data.findIndex((e, i, a) => e.id === id)
      this.props.dispatch(actions.selectPackingOrder(index))
    }))
  }


  handlePagination(direction) {
    this.props.dispatch(actions.pagePackingOrders(direction))
  }

  handleSelectPackingOrder(index) {

    let p = this.props.packingOrders.data[index]
    if (!p) 
      return 

    this.props.dispatch(actions.selectPackingOrder(index))
    // this.props.dispatch(inventoryActions.fetchInventory({processes: p.id}))
  }

  renderDialogs() {
    if(this.state.createPackingOrdersDialog) {
      return <PackingOrdersCreateDialog 
        onToggle={() => this.toggleDialog("createPackingOrdersDialog")}
      />
    }
    return null
  }

}


// This is our select function that will extract from the state the data slice we want to expose
// through props to our component.
const mapStateToProps = (state/*, props*/) => {
  return {
    packingOrders: state.packingOrders,
    contacts: state.contacts,
  }
}

const connectedPackingOrders = connect(mapStateToProps)(PackingOrders)

export default connectedPackingOrders
