import React from 'react'
import { connect } from 'react-redux'
import ProcessAttribute from './ProcessAttribute'
import ProcessAttributeCreator from './ProcessAttributeCreator'
import * as actions from './ProcessAttributeActions'
import Sortable from '../Sortable/Container'

class ProcessAttributeList extends React.Component {
	constructor(props) {
		super(props)
		this.saveAttribute = this.saveAttribute.bind(this)
		this.startAddingAttribute = this.startAddingAttribute.bind(this)
		this.finishAddingAttribute = this.finishAddingAttribute.bind(this)
		this.archiveAttribute = this.archiveAttribute.bind(this)
	}

	render() {
		let {data, ui} = this.props
		let item = data[ui.selectedItem]

		return (
			<div className="products-card-section products-card-attributes">
				<h2>Attributes</h2>
				<Sortable 
					cards={item.attributes} 
					canEdit={true} 
					finishMovingCard={this.moveAttribute.bind(this)} 
					renderer={ProcessAttribute} 
				/>
				{ this.renderAddAttributeSection() }
			</div>
		)
	}

	renderAddAttributeSection() {
		if (this.props.ui.isAddingAttribute)
			return (<ProcessAttributeCreator onCancel={this.finishAddingAttribute} onSubmit={this.saveAttribute}/>)

		return (<AddAttributeButton onClick={this.startAddingAttribute}/>)
	}

	// MARK:- ACTIONS 

	archiveAttribute(index) {
		let {data, ui} = this.props
		this.props.dispatch(actions.archiveAttribute(ui.selectedItem, index, data[ui.selectedItem].attributes[index]))
	}

	saveAttribute(name, type) {
    let {data, ui} = this.props
    let selectedProcess = data[ui.selectedItem].id
    let attribute = {name: name, process_type: selectedProcess}
    this.props.dispatch(actions.saveAttribute(ui.selectedItem, attribute))
  }

  startAddingAttribute() {
    this.props.dispatch(actions.startAddingAttribute())
  }

  finishAddingAttribute() {
    this.props.dispatch(actions.finishAddingAttribute())
  }

  moveAttribute(id, toIndex) {
  	let {ui, data} = this.props
		this.props.dispatch(actions.postRequestMoveAttribute(ui.selectedItem, id, toIndex))  	
  }
}





function AddAttributeButton(props) {
	let button = (
		<span onClick={props.onClick}>
			<i className="material-icons">add</i>
			Add an attribute
		</span>
	)

	return (
		<ProcessAttribute 
			name={button} 
			type={""} 
			newAttribute={true}
		/>
	)
}


const mapStateToProps = (state/*, props*/) => {
	let {data, ui} = state.processes
  return {
    data: state.processes.data,
    ui: state.processes.ui,
  }
}

export default connect(mapStateToProps)(ProcessAttributeList)
