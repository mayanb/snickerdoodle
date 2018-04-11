import React from 'react'
import { connect } from 'react-redux'
import Button from '../Button/Button'
import ZeroState from './ProcessAttributeZeroState'
import ProcessAttribute from './ProcessAttribute'
import ProcessAttributeNew from './ProcessAttributeNew'
import * as actions from './ProcessAttributeActions'
import Sortable from '../Sortable/Container'
import './styles/processattributelist.css'
import ProcessAttributeDeleteDialog from './ProcessAttributeDeleteDialog'
import {Slide} from '../Animations/Animations'

class ProcessAttributeList extends React.Component {
	constructor(props) {
		super(props)
		this.saveAttribute = this.saveAttribute.bind(this)
		this.startAddingAttribute = this.startAddingAttribute.bind(this)
		this.finishAddingAttribute = this.finishAddingAttribute.bind(this)
		this.archiveAttribute = this.archiveAttribute.bind(this)
		this.handleDelete = this.handleDelete.bind(this)
		this.handleSelect = this.handleSelect.bind(this)
		this.state = {
			isDeletingAttribute: null,
			isDeletingAttributeIndex: -1,
		}
	}

	render() {
		let {ui} = this.props

		return (
			<div className="process-attributes">
				<ProcessAttributesHeader 
					onAdd={this.startAddingAttribute}
					onCancel={this.finishAddingAttribute} 
					isAdding={ui.isAddingAttribute}
				/>
				{this.renderList()}
				{this.renderDeleteAttributeDialog()}
			</div>
		)
	}

	renderList() {
		let {ui} = this.props
		let attrs = this.constructAttributeList()
		if (!attrs.length && !ui.isAddingAttribute) {
			return <ZeroState />
		}

		return (
			<div>
				<div className="process-attr-list-header">
					<span>Name</span>
					<span>Type</span>
				</div>
				<Slide>
				{ 
					ui.isAddingAttribute && <ProcessAttributeNew 
						onSubmit={this.saveAttribute}
						isLoading={ui.isSavingAttribute}
					/> 
				}
				</Slide>
				<Sortable 
					cards={attrs}
					canEdit={!ui.selectedAttribute}
					finishMovingCard={this.moveAttribute.bind(this)} 
					renderer={ProcessAttribute} 
				/>
			</div>
		)
	}

	renderDeleteAttributeDialog() {
		let { isDeletingAttribute, isDeletingAttributeIndex } = this.state
		let {data} = this.props
		return ( isDeletingAttribute && 
			<ProcessAttributeDeleteDialog 
				attribute={isDeletingAttribute} 
				index={isDeletingAttributeIndex} 
				data={data} 
				attrName={isDeletingAttribute.name} 
				onToggle={() => this.setState({isDeletingAttribute: null})} 
				onDelete={() => this.handleDeleteAttribute()} 
			/>
		)
	}

	constructAttributeList() {
		let { process, ui } = this.props
		return process.attributes.map((attr, i) => { 
			return {
				...attr,
				key: i, 
				isSelected: attr.id === ui.selectedAttribute, 
				onDelete: () => this.handleDelete(attr, i),
				onSelect: () => this.handleSelect(attr),
				onUpdate: (newAttr) => this.handleUpdate(attr, newAttr)
			}
		})
	}

	// MARK:- ACTIONS 

	archiveAttribute(index) {
		let { process, dispatch, process_index } = this.props
		dispatch(actions.archiveAttribute(process_index, index, process.attributes[index]))
	}

	saveAttribute(name, type) {
		let { process, dispatch } = this.props
		let attribute = { name: name, process_type: process.id, datatype: type }
		dispatch(actions.saveAttribute(0, attribute))
	}

	handleDeleteAttribute() {
		let { data, dispatch } = this.props
		let index = this.state.isDeletingAttributeIndex
		dispatch(actions.archiveAttribute(0, index, data[0].attributes[index]))
		this.setState({isDeletingAttribute: null})
	}

	handleDelete(attr, i) {
		this.setState({isDeletingAttribute: attr, isDeletingAttributeIndex: i})
	}

	handleSelect(attr) {
		let {dispatch, process_index, ui} = this.props
		if (ui.isUpdatingAttribute || ui.isSavingAttribute || ui.selectedAttribute === attr.id) {
			return
		}
		dispatch(actions.selectAttribute(process_index, attr.id))
		if (!attr.last_five_values) {
			dispatch(actions.fetchAttributeDetails(process_index, attr.id))
		}
	}

	handleUpdate(attr, updatedAttr) {
		let { dispatch, process_index } = this.props
		dispatch(actions.postUpdateAttribute(process_index, attr.id, updatedAttr))
		dispatch(actions.selectAttribute(process_index, -1))
	}


  startAddingAttribute() {
    this.props.dispatch(actions.startAddingAttribute())
  }

  finishAddingAttribute() {
    this.props.dispatch(actions.finishAddingAttribute())
  }

  moveAttribute(id, toIndex) {
	  let {process_index} = this.props
		this.props.dispatch(actions.postRequestMoveAttribute(process_index, id, toIndex))
  }

  fetchAttributeDetails(id) {
  	let {process_index} = this.props
  	this.props.dispatch(actions.fetchAttributeDetails(process_index, id))
  }
}

function ProcessAttributesHeader({onAdd, onCancel, isAdding}) {
	let button = isAdding 
		? <Button type='gray' onClick={onCancel}>Cancel</Button>
		: <Button onClick={onAdd}>Add a field</Button>

	return (
		<div className="process-attributes-header">
			<span>Log fields</span>
			{button}
		</div>
	)
}

const mapStateToProps = (state, props) => {
	let process_index = state.processes.data.findIndex(e => e.id === props.process.id)
  return {
    data: state.processes.data,
    ui: state.processes.ui,
    process_index: process_index,
  }
}

export default connect(mapStateToProps)(ProcessAttributeList)
