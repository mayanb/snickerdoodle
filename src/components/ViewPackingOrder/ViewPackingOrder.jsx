import React from 'react'
import moment from 'moment'
import {Dialog} from '../OldComponents/Dialog.jsx'
import { connect } from 'react-redux'
import * as actions from './ViewPackingOrderActions'

let dialogs = {
  deleteTask: {
    title: "Are you sure you want to delete this task?",
    text: "You can't undo this action.",
    okText: "Yes, I'm sure"
  }
}

class ViewPackingOrder extends React.Component {
  constructor(props) {
    super(props)
    
    // this.markAsUsed = this.markAsUsed.bind(this)
    // this.closeTask = this.closeTask.bind(this)
    // this.toggleTask = this.toggleTask.bind(this)
    // this.deleteTask = this.deleteTask.bind(this)
    // this.startEditing = this.startEditing.bind(this)
    // this.finishEditing = this.finishEditing.bind(this)
    // this.saveEditing = this.saveEditing.bind(this)
  }

  componentWillMount() {
    //mountQR()
  }

  componentDidMount() {
    let id = this.props.match.params.id
    this.props.dispatch(actions.getPackingOrder(id))
  }


  render() {
    let { packingOrder } = this.props
    
    let dialog = false;
    // if(this.state.showDialog) {
    //   dialog = <Dialog {...this.state.activeDialog} />
    // }
    return (
      <span>{JSON.stringify(packingOrder.data)}</span>
    )
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
const connectedViewPackingOrder = connect(mapStateToProps)(ViewPackingOrder)
export default connectedViewPackingOrder

/*

<button className="task_button" onClick={this.closeTask}>Close Task</button>
            
*/