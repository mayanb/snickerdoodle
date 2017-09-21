import React from 'react'
import api from '../WaffleconeAPI/api'

export default class AsyncSelector extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			input: "",
		}

		this.currentRequest = 0
	}

	handleInputChange(e, throughSelection) {
		this.setState({input: e.target.value})

		this.currentRequest += 1
		let currReq = this.currentRequest

		api.get('/ics/tasks/search/')
			.query({label: this.state.input})
			.end(function (err, res) {
				if (err || !res.ok)
					return 
				if (currReq === this.currentRequest) {
					this.setState({})
				}
			})
	}

	render() {
		return (
			<div>
				<input 
					value={this.state.input} 
					placeholder={this.props.placeholder} 
				/>
			</div>
		)
	}
}