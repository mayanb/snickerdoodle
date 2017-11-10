import React from 'react'
import { connect } from 'react-redux'
import * as actions from './PackingOrdersActions.jsx'
import PackingOrdersList from './PackingOrdersList.jsx'
import PackingOrdersCreateDialog from './PackingOrdersCreateDialog'
import Button from '../Card/Button.jsx'

class PackingOrders extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      createPackingOrdersDialog: true,
    }
  }

  toggleDialog(name) {
    this.setState({[name]: !this.state[name]})
  }

  componentDidMount() {
    this.props.dispatch(actions.fetchPackingOrders())
  }


  render() {
  	let packingOrders = this.props.packingOrders
  	if (packingOrders.ui.isFetchingData) {
      return <div>hi</div>
    }

  	return(
      <div>
        <Button onClick={() => this.toggleDialog("createPackingOrdersDialog")}>Create packing order</Button>
        <PackingOrdersList packingOrders={packingOrders} />
        {this.renderDialogs()}
      </div>
  	)
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
  console.log(state)
  return {
    packingOrders: state.packingOrders,
  }
}

const connectedPackingOrders = connect(mapStateToProps)(PackingOrders)

export default connectedPackingOrders
