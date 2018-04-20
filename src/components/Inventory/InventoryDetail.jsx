import React from 'react'
import { connect } from 'react-redux'
import * as actions from './InventoryActions'
import { post } from '../OldComponents/APIManager.jsx'
import { Link } from 'react-router-dom'
import Loading from '../OldComponents/Loading.jsx'
import { Dropdown } from 'react-toolbox/lib/dropdown'
import Img from '../Img/Img'
import { Dialog } from '../OldComponents/Dialog.jsx'
import api from '../WaffleconeAPI/api'

class InventoryDetail extends React.Component {

	constructor(props) {
		super(props)
		this.latestRequestID = -1
		this.state = {
			selectedItems: {},
			dialog: false
		}

		this.fetchInventoryDetail = this.fetchInventoryDetail.bind(this)
	}

	componentDidMount() {
		if (this.props.processId)
			this.fetchInventoryDetail(this.props.processId)
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.showDetail && this.props.processId !== nextProps.processId) {
			this.fetchInventoryDetail(nextProps.processId)
		}
	}

	fetchInventoryDetail(processId) {
		this.props.dispatch(actions.fetchInventoryItems(processId))
		this.setState({ selectedItems: {} })
	}

	render() {
		let props = this.props
		let process = props.data

		var contentArea = <ItemList
			tasks={props.data.tasks}
			selectedItems={this.state.selectedItems}
			onChange={this.handleItemSelect.bind(this)}
			onSelectAll={this.handleSelectAllToggle.bind(this)}
		/>
		var loading = false
		if (props.loading) {
			loading = <Loading />
		}

		let deliver = false
		const selectedCount = Object.values(this.state.selectedItems).filter(i => i).length
		if (selectedCount > 0) {
			deliver =
				<button onClick={() => this.setState({ dialog: true })}>{`Deliver ${selectedCount} items`}</button>
		}

		let dialog = false
		if (this.state.dialog) {
			dialog =
				<DeliveryDialog onCancel={() => this.setState({ dialog: false })} onDeliver={this.deliverItems.bind(this)} />
		}

		return (
			<div className={"inventory-detail " + (props.showDetail ? "" : "smallDetail")}>
				{dialog}
				<div className="i-detail-header">
					<div className="i-detail-outputdesc" style={{ display: "flex", flexDirection: "row" }}>
						<span style={{ flex: "1" }}>{process.output_desc}</span>
						<span><Link to="/old-inventory/">
              <i style={{ verticalAlign: "middle", fontSize: "16px", flex: "0" }} className="material-icons">close</i>
            </Link></span>
					</div>
					<div className="i-detail-count">
						<span>{(process.count || 0) + " " + process.unit + "s"}</span>
					</div>
				</div>
				<div className="i-detail-content">
					{contentArea}
					{loading}
				</div>
				<div className="i-detail-footer">
					{deliver}
				</div>
			</div>
		)
	}

	handleSelectAllToggle(taskIndex) {
		let items = this.props.data.tasks[taskIndex].items
		const selectedItems = Object.assign({}, this.state.selectedItems)

		const taskSelectedCount = items.reduce((count, item) => {
			return count + (selectedItems[item.id] ? 1 : 0)
		}, 0)

		const newSelectedValue = !(taskSelectedCount === items.length)
		items.forEach(item => selectedItems[item.id] = newSelectedValue)
		this.setState({ selectedItems: selectedItems })

	}

	handleItemSelect(taskIndex, itemIndex) {
		const item = this.props.data.tasks[taskIndex].items[itemIndex]
		const selectedItems = Object.assign({}, this.state.selectedItems)
		selectedItems[item.id] = !selectedItems[item.id]
		this.setState({ selectedItems: selectedItems })
	}

	deliverItems(destination, callback) {
		let itemsToDeliver = Object.keys(this.state.selectedItems)
			.filter(id => this.state.selectedItems[id])
			.map(id => ({ item: id }))

		let users = JSON.parse(window.localStorage.getItem('users-v5'))
		let user = users.data[users.ui.activeUser].user
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
				component.props.dispatch(actions.fetchInventory())
				component.fetchInventoryDetail(component.props.processId)
			}).fail(function (req, err) {
			console.error(`Couldn't deliver the items. :( \n ${err}`)
		})
	}
}

const mapStateToProps = (state, props) => {
	const data = state.inventories.data[props.processId] || {}
	return {
		data: data
	}
}

const ConnectedInventoryDetail = connect(mapStateToProps)(InventoryDetail)
export { ConnectedInventoryDetail as InventoryDetail }

function ItemList({ tasks, onChange, onSelectAll, selectedItems }) {
	return (
		<div>
			{
				(tasks || []).map(function (task, i) {
					return <TaskDropdown
						key={i}
						index={i}
						task={task}
						onChange={onChange}
						onSelectAll={onSelectAll}
						selectedItems={selectedItems}
					/>
				}, this)
			}
		</div>
	)
}

function TaskDropdown({ task, index, onChange, onSelectAll, selectedItems }) {

	return (
		<div className="inventory-task">
			<div className="task-title">
				<a
					href={window.location.origin + "/task/" + task.id}
					target="_blank"
				>
					<span className="item-task">{` ${task.display} (${task.items.length})`}</span>
				</a>
				<button onClick={() => onSelectAll(index)}>all/none</button>
			</div>
			{
				task.items.map(function (item, i) {
					return <Item
						key={i}
						item={item}
						itemIndex={i}
						taskIndex={index}
						onChange={onChange}
						selectedItems={selectedItems}
					/>
				})
			}
		</div>
	)
}

function Item({ item, itemIndex, taskIndex, onChange, selectedItems }) {
	let qr = item.item_qr

	return (
		<div className="item">
			<div className="flex">
				<div className="item-img">
					<Img src="qricon@2x" />
				</div>
				<div>
					<span className="item-qr">{qr.substring(qr.length - 6)}</span>
				</div>
			</div>
			<div className="unflex">
				<input
					type="checkbox"
					value={item.selected}
					checked={!!selectedItems[item.id]}
					onChange={() => onChange(taskIndex, itemIndex)}
				/>
			</div>
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
		this.setState({ loading: true })
		let component = this
		this.props.onDeliver(this.state.destination, function () {
			component.setState({ done: true })
		})
	}

	render() {
		let teams = [{ value: 1, label: "Bama Pirates" }, { value: 2, label: "Valencia Wizards" }, {
			value: 5,
			label: "Fulfillment"
		}, { value: null, label: "Other" }]

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
					<button className="dialog-button dialog-cancel" style={{ display: this.state.loading ? "none" : "" }}
					        onClick={this.props.onCancel}>Cancel
					</button>
					<button className="dialog-button"
					        onClick={this.handleDeliver.bind(this)}>{this.state.loading ? "Delivering..." : "Confirm"}</button>
				</div>
			</Dialog>
		)
	}

	handleDestinationChange(val) {
		this.setState({ destination: val })
	}

}

export { DeliveryDialog }
