import React from 'react'
import Dialog from '../Card/Dialog'
import Button from '../Card/Button'
import Select from 'react-select'

let account_types = [
	{value: 'a', label: 'Administrator'},
	{value: 'w', label: 'User'}
]

export default class CreateTeamMemberDialog extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			first_name: "",
			username: "",
			password: "",
			account_type: "",
		}

		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleInputChange = this.handleInputChange.bind(this)
	}

	handleInputChange(e, key) {
		this.setState({[key]: e.target.value})
	}

	handleSubmit() {
		this.props.onSubmit(this.state, () =>
			this.props.onCancel() 
		)
	}

	render() {
		if (!this.props.isOpen)
			return null;

		return (
			<Dialog onToggle={this.props.onCancel} >
				<div className="create-member">
					<h2>Add a team member</h2>
					<div>
						<label>Name</label>
						<input 
							placeholder="Jane Doe"  
							value={this.state.first_name} 
							onChange={(e)=> this.handleInputChange(e, "first_name")}
						/>
					</div>
					<div>
						<label>Username</label>
						<input 
							className="username" 
							placeholder="letters & numbers only"
							value={this.state.username} 
							onChange={(e)=> this.handleInputChange(e, "username")}
						/>
					</div>
					<div>
						<label>Password</label>
						<input 
							type="password"
							placeholder="***"  
							value={this.state.password} 
							onChange={(e)=> this.handleInputChange(e, "password")}
						/>
					</div>
					<div>
						<label>Account type</label>
						<Select
		          value={this.state.account_type}
		          searchable={false}
		          clearable={false}
		          options={account_types}
		          onChange={(e)=> this.handleInputChange({target: {value: e.value}}, "account_type")}
		          placeholder="Choose an account type"
		        />
					</div>
					<div className="buttons">
						<Button secondary onClick={this.props.onCancel}>Cancel</Button>
						<Button onClick={this.handleSubmit}>Add team member</Button>
					</div>
				</div>
			</Dialog>
		)
	}
}