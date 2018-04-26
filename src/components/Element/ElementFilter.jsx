import React from 'react'
import { Input } from 'antd'
import './styles/elementfilter.css'

export default class ElementFilter extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			value: '',
		}
	}

	render() {
		let { className, onChange, ...rest } = this.props
		return (
			<div className={`element-filter ${className}`}>
				<Input
		      placeholder='Type to filter results'
		      prefix={<i className="material-icons element-filter-icon">filter_list</i>}
		      value={this.state.value}
		      onChange={this.handleChange.bind(this)}
		      {...rest}
		  	/>
	  	</div>
		)
	}

	handleChange(e) {
		this.setState({ value: e.target.value })
		this.props.onChange(e.target.value)
	}
}
