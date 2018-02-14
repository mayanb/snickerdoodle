import React from 'react'
import {connect} from 'react-redux'
import * as actions from './ProcessAttributeActions'
import ProcessAttributeField from './ProcessAttributeField'
import Button from '../Card/Button'
import Img from '../Img/Img'
import ProcessAttributeDeleteDialog from './ProcessAttributeDeleteDialog'


class ProcessAttribute extends React.Component {
	constructor(props) {
		super(props)
		this.toggleRequiredOnAttribute = this.toggleRequiredOnAttribute.bind(this)
		this.state = {
			isDeletingAttribute: null,
		}
	}

	render() {
		let props = this.props

		return (
			<div className={"process-attribute stack-horizontal" + (props.newAttribute?"new-attribute":"")}>
				<div className="stack-vertical">
					<div className="stack-horizontal">
						<div className='process-attribute-row'>
							<ProcessAttributeField text main name="Name" value={props.name} edit={props.edit} onChange={props.onChange}/>
							<ProcessAttributeField/>
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
					{this.renderDeleteAttributeDialog()}
			</div>
		)
	}

	toggleRequiredOnAttribute() {
		let updated = {required: !this.props.required}
		this.props.dispatch(actions.postUpdateAttribute(this.props.ui.selectedItem, this.props.id, updated))
	}

	handleArchive() {
		this.setState({isDeletingAttribute: true})
	}

	handleDeleteAttribute() {
		let {data, index} = this.props
		this.props.dispatch(actions.archiveAttribute(0, index, data[0].attributes[index]))
		this.setState({isDeletingAttribute: null})
	}

	renderDeleteAttributeDialog() {
		let {data, index} = this.props
		if (this.state.isDeletingAttribute)
			return <ProcessAttributeDeleteDialog index={index} data={data} attrName={data[0].attributes[index].name} onToggle={() => this.setState({isDeletingAttribute: null})} onDelete={() => this.handleDeleteAttribute()} />
		return null
	}
}

const mapStateToProps = (state/*, props*/) => {
  return {
    data: state.processes.data,
    ui: state.processes.ui,
  }
}

export default connect(mapStateToProps)(ProcessAttribute)
