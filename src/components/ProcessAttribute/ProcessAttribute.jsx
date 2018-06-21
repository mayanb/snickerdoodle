import React from 'react'
import {connect} from 'react-redux'
import * as actions from './ProcessAttributeActions'
import ElementCard from '../Element/ElementCard'
import Submissions from './ProcessAttributeSubmissions'
import ProcessAttributeDatatype from './ProcessAttributeDatatype'
import ProcessAttributeField from './ProcessAttributeField'
import ProcessAttributeRecurrentCheckbox from './ProcessAttributeRecurrentCheckbox'
import Button from '../Button/Button'
import './styles/processattribute.css'

class ProcessAttribute extends React.Component {
	constructor(props) {
		super(props)
		this.toggleRequiredOnAttribute = this.toggleRequiredOnAttribute.bind(this)
		this.state = {
			isDeletingAttribute: null,
			editingName: props.name,
			editingType: props.datatype,
			is_recurrent: props.is_recurrent,
		}
	}

	componentWillReceiveProps(np) {
		let { editingName, editingType } = this.state
		if (np.name !== editingName || np.datatype !== editingType) {
			this.setState({editingType: np.datatype, editingName: np.name})
		}
	}

	render() {
		let {isSelected, name, datatype, rank, last_five_values, onDelete, onSelect, onUpdate} = this.props
		let { editingName, editingType, is_recurrent } = this.state
		if (isSelected) {
			return (
				<ElementCard selected className="process-attr-selected" handle index={rank} onDelete={onDelete}>
					<div className="process-attr-inputs">
						<ProcessAttributeField focus edit name="Name" value={editingName} onChange={(e) => this.handleChange('editingName', e.target.value)} />
						<ProcessAttributeField edit select name="Type" value={editingType} onChange={(e) => this.handleChange('editingType', e.value)} />
					</div>
					<ProcessAttributeRecurrentCheckbox checked={this.state.is_recurrent} onChange={(e) => this.handleChange('is_recurrent', e.target.checked)}/>
					<Submissions name={editingName} recent={last_five_values} datatype={datatype}/>
					<Button wide onClick={() => onUpdate({name: editingName, datatype: editingType, is_recurrent: is_recurrent})}>Save</Button>
				</ElementCard>
			)
		}
		return (
			<ElementCard className="process-attribute" index={rank} handle onDelete={onDelete} onClick={onSelect}>
				<span className="process-attr-name">{name}</span>
				<ProcessAttributeDatatype type={datatype}/>
			</ElementCard>
		)
	}

	handleChange(key, value) {
		this.setState({ [key] : value })
	}

	toggleRequiredOnAttribute() {
		let updated = {required: !this.props.required}
		this.props.dispatch(actions.postUpdateAttribute(this.props.ui.selectedItem, this.props.id, updated))
	}
}

const mapStateToProps = (state/*, props*/) => {
  return {
    data: state.processes.data,
    ui: state.processes.ui,
  }
}

export default connect(mapStateToProps)(ProcessAttribute)
