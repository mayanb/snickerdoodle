import React from 'react'
import Dialog from '../Card/Dialog'
import Button from '../Card/Button'

// team, the user 

export default class CreateTeamMemberDialog extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			first_name: "",
			username: "",
			password: "",
			account_type: "a",
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
						<Button secondary onClick={this.props.onCancel}>Cancel</Button>
						<Button onClick={this.handleSubmit}>Add team member</Button>
					</div>
				</div>
			</Dialog>
		)
	}
}