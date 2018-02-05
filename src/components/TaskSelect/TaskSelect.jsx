import React from 'react';
import api from '../WaffleconeAPI/api.jsx'
import Select from 'react-select'
import './styles/taskselect.css'

const getOptions = function (input, callback) {
	if (input.length < 2) {
		callback(null, { options: [] })
	} else {
		let params = {
			limit: true,
			ordering: '-created_at',
			label: input,
		}

		api.get('/ics/tasks/search/')
			.query(params)
			.end(function (err, res) {
				if (err || !res.ok) {
					console.log("bad")
				} else {
					console.log(res.body.results)
					let options = res.body.results.map(function (x) {
						let display_input = x.display
						if (!x.display.toLowerCase().startsWith(input)) {
							display_input = input + " - " + x.display
						}
						return { value: x.id, label: display_input }
					})
					callback(null, { options: options, complete: false })
				}
			})

	}
}

export default class TaskSelect extends React.Component {
	constructor() {
		super();
		this.handleChange = this.handleChange.bind(this);
		this.state = {}

	}

	handleChange(value) {
		let v;
		if (value !== undefined && value !== null && value.length !== 0)
			v = value
		else v = { value: "" }

		this.setState(v)
		this.props.onChange(v)
	};

	render() {
		return (
			<div className="task-select">
				<i className="material-icons">search</i>
				<Select.Async
					name="form-field-name"
					value={this.state.value}
					loadOptions={getOptions}
					onChange={this.handleChange}
					placeholder={this.props.placeholder}
				/>
			</div>
		);
	}


}
