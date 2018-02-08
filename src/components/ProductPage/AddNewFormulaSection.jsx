import React from 'react'
import {connect} from 'react-redux'
import Select from '../Inputs/Select'
import * as actions from '../Processes/ProcessesActions'

class AddNewFormulaSection extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			selectedProcess: null
		}
		this.handleChange = this.handleChange.bind(this)
	}

	componentDidMount() {
		this.props.dispatch(actions.fetchProcesses())
	}

	handleChange(val) {
		this.setState({selectedProcess: val})
	}

	render() {
		let {data} = this.props
		return (
			<div className="add-formula">
				<span>Add a formula for</span>
				<div className="select-process">
					<Select
						name="processes"
						value={this.state.selectedProcess}
						valueKey='id'
						labelKey='name'
						onChange={this.handleChange}
						options={data}
					/>
				</div>
				{ this.state.selectedProcess ? <button>Add</button> : null }
			</div>
		)
	}
}

const mapStateToProps = (state/*, props*/) => {
  return {
    data: state.processes.data,
    ui: state.products.ui,
  }
}

export default connect(mapStateToProps)(AddNewFormulaSection)