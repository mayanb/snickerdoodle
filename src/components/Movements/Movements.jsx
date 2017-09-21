import React from 'react'
import { connect } from 'react-redux'
import * as actions from './MovementsActions.jsx'
import Card from '../Card/Card.jsx'

class Movements extends React.Component {
  constructor(props) {
    super(props)
  }

   // fetch movements on load
  componentDidMount() {
    this.props.dispatch(actions.fetchMovements())
  }


  render() {
  	let movements = this.props.movements
  	if (this.props.isFetching === true) {return(<div>hi</div>)}

  	return(
  		<ul>
  			{movements.map(function(movement, index) {
  				return(<li>{JSON.stringify(movement)}</li>)
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
