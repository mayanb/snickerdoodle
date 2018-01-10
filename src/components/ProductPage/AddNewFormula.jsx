import React from 'react'
import Button from '../Card/Button'
import Select from 'react-select'

export default class AddNewFormula extends React.Component {
	render() {
		return (
			<div className="recipe-formula add-formula">
				<div className="formula-inputs">
					<Select 	
						name="processes"
						value={null}
						valueKey='id'
						labelKey='name'
						onChange={this.handleChange}
						options={[]}
					/>
					<Select 
						name="processes"
						value={null}
						valueKey='id'
						labelKey='name'
						onChange={this.handleChange}
						options={[]}
					/>
					<input type="text"/>
				</div>
				<div className="formula-actions">
					<Button secondary>Cancel</Button>
					<Button>Add</Button>
				</div>
			</div>
		)
	}
}