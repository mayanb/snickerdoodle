import React from 'react'
import {connect} from 'react-redux'
import Loading from '../OldComponents/Loading.jsx'
import * as actions from '../InventoryDetail/InventoryDetailActions'
import Dialog from '../Card/Dialog'
import {Dropdown} from 'react-toolbox/lib/dropdown'

class InventoryDetailList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {dialog: false}
  }
  
  render() {
    let {ui, data} = this.props.inventoryDetails
    var loading = false
    if (ui.isFetchingMore) {
      loading = <Loading />
    }

    let loadMore = false
    console.log(ui.next)
    if (ui.next && !ui.isFetchingMore) {
      loadMore = <button onClick={this.handleLoadClick.bind(this)}>Load More</button>
    }

    let deliver = false
    if (ui.selectedCount > 0) {
      deliver = <button onClick={() => this.setState({dialog: true})}>{`Deliver ${ui.selectedCount} items`}</button> 
    }

    let dialog = false
    if (this.state.dialog) {
      dialog = <DeliveryDialog onCancel={() => this.setState({dialog: false})} onDeliver={this.handleDeliverItems.bind(this)}/>
    }

  	return (
      <div className="i-detail-content">
    		<ItemList 
          tasks={this.props.inventoryDetails.data} 
        	onChange={this.handleItemSelect.bind(this)}
        	onSelectAll={this.handleSelectAllToggle.bind(this)}
    	  />
        {loading}
        <div style={{display: "flex", flexDirection: "row"}} >
          {loadMore}
          {deliver}
          {DeliveryDialog}
        </div>
      </div>
    )
  }

  handleItemSelect(taskIndex, itemIndex) {
    console.log(this.props.inventoryDetails)
    this.props.dispatch(actions.toggleItemSelect(taskIndex, itemIndex))
  }

  handleSelectAllToggle(taskIndex) {
    this.props.dispatch(actions.toggleTaskSelectAll(taskIndex))
  }

  handleLoadClick() {
    this.props.dispatch(actions.fetchMore(this.props.inventoryDetails.ui.next))
  }

  handleDeliverItems(destination, callback) {
    this.props.dispatch(actions.deliverItems())

    let tasks = this.props.inventoryDetails.data

    let itemsToDeliver = []
    for (let task of tasks) {
      for (let item of task.items) {
        if (item.selected) {
          itemsToDeliver.push({item: `${item.id}`})
        }
      }
    }

    let users = JSON.parse(window.localStorage.getItem('users-v4.1'))
    let user = users.data[users.ui.activeUser].user
    let team = user.team
    let component = this
    let url = '/ics/v4/movements/create/'

    let params = {
      status: "RC", 
      origin: user.user_id,
      destination: null,
      team_origin: user.team, 
      team_destination: destination,  
      notes: "DELIVERED VIA WEB",
      items: itemsToDeliver
    }

    let headers = {
      contentType: 'application/json',
      processData: false,
    }

    post(api.host + url, JSON.stringify(params), headers)
      .done(function (data) {
        if (callback) 
          callback()
        component.props.onDelivery(component.state.selectedCount)
        //component.getInventoryItems(component.props, null)
        component.setState({selectedCount: 0})
      }).fail(function (req, err) {
        alert(`Couldn't deliver the items. :( \n ${err}`)
      })
  }
}
}

const mapStateToProps = (state/*, props*/) => {
  return {
    inventoryDetails: state.inventoryDetails,
  }
}

export default connect(mapStateToProps)(InventoryDetailList)











// --------------------------------------------------

function ItemList(props) {
  return (
    <div className="i-detail-content">
    {
      (props.tasks || []).map(function (task, i) {
        return <TaskDropdown key={i} index={i} {...task} onChange={props.onChange} onSelectAll={props.onSelectAll}/>
      }, this)
    }
    </div>
  )
}

function Item(props) {
  let qr = props.item_qr
  let src = window.location.origin + "/public/img/qricon@2x.png"
  return (
    <div className="item" onClick={props.onClick}>
      <div className="flex">
        <div className="item-img">
          <img src={src} />
        </div>
        <div>
          <span className="item-qr">{qr.substring(qr.length - 6)}</span>
        </div>
      </div>
      <div className="unflex">
        <input 
          type="checkbox" 
          value={props.selected || false}
          checked={props.selected || false} 
          onChange={() => props.onChange(props.taskIndex, props.itemIndex)}
        />
      </div>
    </div>
  )
}

function TaskDropdown(props) {

  return (
    <div className="inventory-task">
      <div className="task-title">
        <a 
          href={window.location.origin + "/task/" + props.id}
          target="_blank"
        >
          <span className="item-task">{` ${props.display} (${props.items.length})`}</span>
        </a>
        <button onClick={() => props.onSelectAll(props.index)}>all/none</button>
      </div>
    {
      props.items.map(function (item, i) {
        return <Item {...item} key={i} itemIndex={i} taskIndex={props.index} onChange={props.onChange} />
      })
    }
    </div>
  )
}

class DeliveryDialog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      destination: null,
      loading: false,
      done: false
    }
  }

  handleDeliver() {
    this.setState({loading: true})
    let component = this
    this.props.onDeliver(this.state.destination, function () {
      component.setState({done: true})
    })
  }

  render() {
    let teams = [{value: 1, label: "Bama Pirates"}, {value: 2, label: "Valencia Wizards"}, {value: 5, label: "Fulfillment"}, {value: null, label: "Other"}]

    if (this.state.done) {
      return (
        <Dialog>
          <span className="dialog-title">Deliver items</span>
          <span className="dialog-text">Yay! You delivered the items!</span>
          <div className="dialog-actions">
            <button className="dialog-button dialog-cancel" onClick={this.props.onCancel}>OK</button>
          </div>
        </Dialog>
      )
    } else return (
      <Dialog>
        <span className="dialog-title">Deliver items</span>
        <span className="dialog-text">Where do you want to send these items?</span>
        <Dropdown
          source={teams}
          onChange={(val) => this.handleDestinationChange(val)}
          value={this.state.destination}
        />
        <div className="dialog-actions">
          <button className="dialog-button dialog-cancel" style={{display: this.state.loading?"none":""}} onClick={this.props.onCancel}>Cancel</button>
          <button className="dialog-button" onClick={this.handleDeliver.bind(this)}>{this.state.loading?"Delivering...":"Confirm"}</button>
        </div>
      </Dialog>
    )
  }

  handleDestinationChange(val) {
    this.setState({destination: val})
  }

}