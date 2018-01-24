import React from 'react'
import {connect} from 'react-redux'
import * as actions from './ProductFormulaActions'
import Select from '../Inputs/Select'

class AddSection extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			process_type: null,
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleAdd = this.handleAdd.bind(this)
	}

	render() {
		return (
			<div className="addsection-wrapper">
				<div className="addsection">
					<span>Add a stage</span>
					<Select 
						styleType="gray"
						value={this.state.process_type}
						valueKey="id"
						labelKey="name"
						options={exclude(this.props.processes, this.props.exclude)}
						onChange={this.handleChange}
					/>
					<i 
						className={"material-icons " + (this.state.process_type?'active':'')} 
						onClick={this.handleAdd}
					>
						add_circle_outline
					</i>
				</div>
			</div>
		)	
	}

	handleChange(value) {
		this.setState({process_type: value})
	}

	handleAdd() {
		if (!this.state.process_type) 
			return 
		this.props.dispatch(actions.addSection(this.state.process_type))

	}

}

function exclude(arr = [], toExclude = []) {
	let newArr = []
	arr.forEach((e, i) => {
		if (toExclude.find(k => String(k.id) === String(e.id))) {
			return
		}
		newArr.push(e)
	})
	return newArr
}


const mapStateToProps = (state/*, props*/) => {
	return {
		processes: state.processes.data
	}
}

export default connect(mapStateToProps)(AddSection)