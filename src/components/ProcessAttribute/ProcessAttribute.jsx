import React from 'react'
import {connect} from 'react-redux'
import * as actions from './ProcessAttributeActions'
import ProcessAttributeField from './ProcessAttributeField'
import Button from '../Card/Button'
import Img from '../Img/Img'

class ProcessAttribute extends React.Component {
	constructor(props) {
		super(props)
		this.toggleRequiredOnAttribute = this.toggleRequiredOnAttribute.bind(this)
	}

	render() {
		let props = this.props

		return (
			<div className={"process-attribute stack-horizontal" + (props.newAttribute?"new-attribute":"")}>
				<div className="stack-vertical">
					<div className="stack-horizontal">
						<div className='process-attribute-row'>
							<ProcessAttributeField text main name="Name" value={props.name} edit={props.edit} onChange={props.onChange}/>
							<ProcessAttributeField switch name="Required" value={props.required} onChange={props.onChange || this.toggleRequiredOnAttribute} />
						</div>

						<div className='process-attribute-row'>
							<ProcessAttributeField select name="Datatype" value={props.datatype||"Text"} edit={props.edit} onChange={props.onChange}/>
							<ProcessAttributeField/>
						</div>
					</div>

					<div style={{visibility: props.edit?"hidden":"visible"}} className="drag-handle">
						<Img src="drag@2x" />
						<span className="process-attribute-more" onClick={props.newAttribute?()=>null:this.handleArchive.bind(this)} >
							Delete
						</span>
					</div>
				</div>

					<div style={{display: props.edit?"":"none"}} className='process-attribute-row buttons'>
							<Button secondary onClick={props.onCancel}>Cancel</Button>
							<Button onClick={props.onSubmit}>Add</Button>
					</div>

			</div>
		)
	}

	toggleRequiredOnAttribute() {
		let updated = {required: !this.props.required}
		this.props.dispatch(actions.postUpdateAttribute(this.props.ui.selectedItem, this.props.id, updated))
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
