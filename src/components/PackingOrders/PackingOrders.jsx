import React from 'react'
import { connect } from 'react-redux'
import * as actions from './PackingOrdersActions.jsx'
import Card from '../Card/Card.jsx'

class PackingOrders extends React.Component {
  componentDidMount() {
    this.props.dispatch(actions.fetchPackingOrders())
  }


  render() {
  	let packingOrders = this.props.packingOrders
  	if (packingOrders.ui.isFetchingData === true) {return(<div>hi</div>)}

  	// return(
   //    <div>
   //      <PackingOrdersList packingOrders={packingOrders.data} />
   //    </div>
  	// )
    return(
      <ul>
        {packingOrders.data.map(function(po, index) {
          return(<li>{JSON.stringify(po)}</li>)
        })}
      </ul>

    )
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
