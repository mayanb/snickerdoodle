import React from 'react'
import {connect} from 'react-redux'
import ContentEditable from '../ContentEditable/ContentEditable'
import AvailableAttributes from './AvailableAttributes'
import './styles/formulafield.css'

const STR = 'string'
const ATTR = 'attr'

class FormulaField extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			html: `1+<div class="attribute-pill" contentEditable="false">Roasting Temperature</div>*23`,
			showDropdown: false,
		}
		this.handleSelect = this.handleSelect.bind(this)
	}

	render() {
		let {attributes} = this.props
		let {html, showDropdown} = this.state
		return (
			<div>
			<ContentEditable 
				className="formula-field" 
				contentEditable={true} 
				html={html}
				onChange={this.handleChange.bind(this)}
			/>
			{ showDropdown ? <AvailableAttributes attributes={attributes} onSelect={this.handleSelect}/> : null }
			</div>
		)
	}

	handleChange(e) {
		if (e.target.value) {
			this.setState({html: e.target.value})
		}

		if (e.type == 'keydown' && e.key === 'Enter' && this.state.showDropdown === true) {
			this.handleSelect(this.props.attributes[0])
		}

		if (e.type === 'keydown') {
			if (e.key === '$' || (/[a-zA-Z0-9]/.test(e.key) && /\$[a-zA-Z0-9]*$/.test(this.state.html))) {
				this.setState({showDropdown: true})
			} else if (e.key !== 'Shift' && e.key !== 'Enter') {
				this.setState({showDropdown: false})
			}
		}
	}

	createAttribute(attribute) {
		return `<div class="attribute-pill" data-id=${attribute.id} contentEditable="false" >${attribute.name}</div>`
	}

	handleSelect(attribute) {
		let {html} = this.state
		let newHtml = html.substring(0, html.lastIndexOf('$')) + this.createAttribute(attribute)
		this.setState({html: newHtml, showDropdown: false})
	}
}

const mapStateToProps = (state, props) => {
	let process_id = state.formulas.ui.isAddingFormula
	if (process_id === undefined) {
		return {
			attributes: [],
		}
	}

	let process_type = state.processes.data.find(e => parseInt(e.id, 10) === process_id) || {}
  return {
    attributes: process_type.attributes
  }
}

export default connect(mapStateToProps)(FormulaField)