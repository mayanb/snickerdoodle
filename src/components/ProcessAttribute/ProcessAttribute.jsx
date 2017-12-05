import React from 'react'
import {connect} from 'react-redux'
import * as actions from './ProcessAttributeActions'
import Button from '../Card/Button'

class ProcessAttribute extends React.Component {

	render() {
		let props = this.props

		return (
			<div className={"process-attribute " + (props.newAttribute?"new-attribute":"")}>
				<div className="process-attribute-move">
					<i className="material-icons">drag_handle</i>
				</div>
				<div className="process-attribute-name">
					<span>{props.name}</span>
				</div>
				<div className="process-attribute-type">
					<span></span>
				</div>
				<div className="process-attribute-more" onClick={props.newAttribute?()=>null:this.handleArchive.bind(this)} >
					<i className="material-icons">delete</i>
				</div>
			</div>
		)
	}

	handleArchive() {
		let {data, ui, index} = this.props
		this.props.dispatch(actions.archiveAttribute(ui.selectedItem, index, data[ui.selectedItem].attributes[index]))
	}
}

const mapStateToProps = (state/*, props*/) => {
	let {data, ui} = state.processes
  return {
    data: state.processes.data,
    ui: state.processes.ui,
  }
}

export default connect(mapStateToProps)(ProcessAttribute)
