import React from 'react'
import {connect} from 'react-redux'
import {Slide} from '../Animations/Animations'
import * as actions from './ProcessAttributeActions'
import Wrapper from './ProcessAttributeWrapper'
import Submissions from './ProcessAttributeSubmissions'
import ProcessAttributeDatatype from './ProcessAttributeDatatype'
import ProcessAttributeField from './ProcessAttributeField'
import Button from '../Button/Button'
import './styles/processattribute.css'

class ProcessAttribute extends React.Component {
	constructor(props) {
		super(props)
		this.toggleRequiredOnAttribute = this.toggleRequiredOnAttribute.bind(this)
		this.state = {
			isDeletingAttribute: null,
		}
	}

	render() {
		let {name, datatype, index, onDelete} = this.props
		if (this.props.selected) {
			return (
				<Wrapper className="selected" index={index} deletable={true}>
					<div className="process-attr-inputs">
						<ProcessAttributeField edit name="Name" />
						<ProcessAttributeField edit select name="Type" />
					</div>
					<Submissions name={name}/>
					<Button>Save</Button>
				</Wrapper>
			)
		}
		return (
			<Slide>
			<Wrapper index={index+1} onDelete={onDelete}>
				<span className="process-attr-name">{name}</span>
				<ProcessAttributeDatatype type={datatype}/>
			</Wrapper>
			</Slide>
		)
	}

	toggleRequiredOnAttribute() {
		let updated = {required: !this.props.required}
		this.props.dispatch(actions.postUpdateAttribute(this.props.ui.selectedItem, this.props.id, updated))
	}

	handleArchive() {
		this.props.onDelete()
	}

}

const mapStateToProps = (state/*, props*/) => {
  return {
    data: state.processes.data,
    ui: state.processes.ui,
  }
}

export default connect(mapStateToProps)(ProcessAttribute)
