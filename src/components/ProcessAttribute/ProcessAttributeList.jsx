import React from 'react'
import { connect } from 'react-redux'
import ProcessAttribute from './ProcessAttribute'
import ProcessAttributeCreator from './ProcessAttributeCreator'
import * as actions from './ProcessAttributeActions'
import Sortable from '../Sortable/Container'
import './styles/processattribute.css'



class ProcessAttributeList extends React.Component {
	constructor(props) {
		super(props)
		this.saveAttribute = this.saveAttribute.bind(this)
		this.startAddingAttribute = this.startAddingAttribute.bind(this)
		this.finishAddingAttribute = this.finishAddingAttribute.bind(this)
		this.archiveAttribute = this.archiveAttribute.bind(this)
	}

	render() {
		let {process} = this.props

		return (
			<div className="products-card-section products-card-attributes">
				<div className="attribute-header">
					<h2>Data</h2>
					<button onClick={this.startAddingAttribute}>Add a new attribute</button>
				</div>
				{ this.renderAddAttributeSection() }
				<Sortable 
					cards={process.attributes}
					canEdit={true} 
					finishMovingCard={this.moveAttribute.bind(this)} 
					renderer={ProcessAttribute} 
				/>
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
		let { process, ui } = this.props
		let attribute = { name: name, process_type: process.id, datatype: type }
		this.props.dispatch(actions.saveAttribute(0, attribute))
	}

  startAddingAttribute() {
    this.props.dispatch(actions.startAddingAttribute())
  }

  finishAddingAttribute() {
    this.props.dispatch(actions.finishAddingAttribute())
  }

  moveAttribute(id, toIndex) {
	  let {process, ui} = this.props
		this.props.dispatch(actions.postRequestMoveAttribute(ui.selectedItem, id, toIndex))
  }
}





// function AddAttributeButton(props) {
// 	return <ProcessAttributeCreator onCancel={this.finishAddingAttribute} onSubmit={this.saveAttribute}/>
// }


const mapStateToProps = (state/*, props*/) => {
	let {data, ui} = state.processes
  return {
    data: state.processes.data,
    ui: state.processes.ui,
  }
}

export default connect(mapStateToProps)(ProcessAttributeList)
