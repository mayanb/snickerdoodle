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
  	if (this.props.isFetching === true) {return(<div>hi</div>)}

  	return(
  		<ul>
  			{packingOrders.map(function(packingOrder, index) {
  				return(<li>{JSON.stringify(packingOrder)}</li>)
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
    movements: state.movements.data,
    isFetching: state.movements.ui.isFetchingData
  }
}

const connectedMovements = connect(mapStateToProps)(Movements)

export default connectedMovements
