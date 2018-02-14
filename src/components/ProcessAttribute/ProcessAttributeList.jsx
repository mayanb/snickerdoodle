import React from 'react'
import { connect } from 'react-redux'
import update from 'immutability-helper'
import ProcessAttribute from './ProcessAttribute'
import ProcessAttributeCreator from './ProcessAttributeCreator'
import * as actions from './ProcessAttributeActions'
import Sortable from '../Sortable/Container'
import './styles/processattribute.css'
import ProcessAttributeDeleteDialog from './ProcessAttributeDeleteDialog'




class ProcessAttributeList extends React.Component {
	constructor(props) {
		super(props)
		this.saveAttribute = this.saveAttribute.bind(this)
		this.startAddingAttribute = this.startAddingAttribute.bind(this)
		this.finishAddingAttribute = this.finishAddingAttribute.bind(this)
		this.archiveAttribute = this.archiveAttribute.bind(this)
		this.handleDelete = this.handleDelete.bind(this)
		this.state = {
			isDeletingAttribute: null,
			isDeletingAttributeIndex: -1,
		}
	}

	render() {
		let {process} = this.props
		let hd = this.handleDelete

		let sortableAttributes = []
		process.attributes.forEach(function (attr, i) {
			sortableAttributes.push(
				update(
					attr, 
					{$merge: {attribute: attr, onDelete: () => hd(attr, i) }}
				)
			)
		})



		return (
			<div className="products-card-section products-card-attributes">
				<div className="attribute-header">
					<h2>Data</h2>
					<button onClick={this.startAddingAttribute}>Add a new attribute</button>
				</div>
				{ this.renderAddAttributeSection() }
				<Sortable 
					cards={sortableAttributes}
					canEdit={true} 
					finishMovingCard={this.moveAttribute.bind(this)} 
					renderer={ProcessAttribute} 
				/>
				{this.renderDeleteAttributeDialog()}
			</div>
		)
	}

	renderAddAttributeSection() {
		if (this.props.ui.isAddingAttribute)
			return (<ProcessAttributeCreator onCancel={this.finishAddingAttribute} onSubmit={this.saveAttribute}/>)
		return null

		//return (<AddAttributeButton onClick={this.startAddingAttribute}/>)
	}

	// MARK:- ACTIONS 

	archiveAttribute(index) {
		let {process, ui} = this.props
		this.props.dispatch(actions.archiveAttribute(ui.selectedItem, index, process.attributes[index]))
	}

	saveAttribute(name, type) {
		let { process } = this.props
		let attribute = { name: name, process_type: process.id }
		this.props.dispatch(actions.saveAttribute(0, attribute))
	}

	handleDeleteAttribute() {
		let {data} = this.props
		let index = this.state.isDeletingAttributeIndex
		this.props.dispatch(actions.archiveAttribute(0, index, data[0].attributes[index]))
		this.setState({isDeletingAttribute: null})
	}

	renderDeleteAttributeDialog() {
		let {data} = this.props
		if (this.state.isDeletingAttribute)
			return <ProcessAttributeDeleteDialog attribute={this.state.isDeletingAttribute} index={this.state.isDeletingAttributeIndex} data={data} attrName={this.state.isDeletingAttribute.name} onToggle={() => this.setState({isDeletingAttribute: null})} onDelete={() => this.handleDeleteAttribute()} />
		return null
	}

	handleDelete(attr, i) {
		this.setState({isDeletingAttribute: attr, isDeletingAttributeIndex: i})
	}


  startAddingAttribute() {
    this.props.dispatch(actions.startAddingAttribute())
  }

  finishAddingAttribute() {
    this.props.dispatch(actions.finishAddingAttribute())
  }

  moveAttribute(id, toIndex) {
	  let {ui} = this.props
		this.props.dispatch(actions.postRequestMoveAttribute(ui.selectedItem, id, toIndex))
  }
}





// function AddAttributeButton(props) {
// 	return <ProcessAttributeCreator onCancel={this.finishAddingAttribute} onSubmit={this.saveAttribute}/>
// }


const mapStateToProps = (state/*, props*/) => {
  return {
    data: state.processes.data,
    ui: state.processes.ui,
  }
}

export default connect(mapStateToProps)(ProcessAttributeList)
