import React from 'react'
import {connect} from 'react-redux'
import ContentEditable from '../ContentEditable/ContentEditable'
import AvailableAttributes from './AvailableAttributes'
import './styles/formulafield.css'

class FormulaField extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			showDropdown: false,
			highlighted: 0,
			attributeIndex: 0,
			restoreCursor: false
		}
		this.handleSelect = this.handleSelect.bind(this)
	}

	componentDidUpdate() {
		const range = document.createRange()
		const sel = document.getSelection()
		if (this.state.restoreCursor) {
			const i = Array.from(this.formulaInput.node.childNodes).findIndex(node => {
				return node.dataset && node.dataset.index === String(this.state.attributeIndex - 1)
			})
			//Move cursor to end if the latest attribute isn't found
			const offset = i !== -1 ? i + 1 : this.formulaInput.node.childNodes.length
			range.setStart(this.formulaInput.node, offset)
			sel.removeAllRanges()
			sel.addRange(range)
		}
	}

	render() {
		let {attributes} = this.props
		let {showDropdown, highlighted} = this.state
		return (
			<div className="formula-field" ref="container">
				<ContentEditable
					ref={(formulaInput) => { this.formulaInput = formulaInput; }}
					contentEditable={true} 
					html={this.props.value}
					onChange={this.handleChange.bind(this)}
				/>
				{ showDropdown ? 
					<AvailableAttributes 
						highlighted={highlighted}
						attributes={attributes} 
						onSelect={this.handleSelect}
					/> : 
					null }
			</div>
		)
	}

	handleChange(e) {
		if (e.target.value !== null && e.target.value !== undefined) {
			this.props.onChange(e.target.value)
		}

		if (e.type === 'keydown' && e.key === 'Enter' && this.state.showDropdown === true) {
			this.handleSelect(this.props.attributes[0])
		}

		if (e.type === 'keydown') {
			if (e.key === '$' || (/[a-zA-Z0-9]/.test(e.key) && /\$[a-zA-Z0-9]*$/.test(this.state.html))) {
				this.setState({showDropdown: true, restoreCursor:  false})
			} else if (e.key !== 'Shift' && e.key !== 'Enter') {
				this.setState({showDropdown: false, restoreCursor:  false})
			}
		}
	}

	createAttribute(attribute, index) {
		return `<div class="attribute-pill" data-id=${attribute.id} data-index=${index} contentEditable="false" >${attribute.name}</div>`
	}

	handleSelect(attribute) {
		let html = this.props.value
		let newHtml = html.replace('$', this.createAttribute(attribute, this.state.attributeIndex))
		this.props.onChange(newHtml)
		this.setState({showDropdown: false, attributeIndex: this.state.attributeIndex + 1, restoreCursor: true})
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