import React from 'react'
import WalkthroughFrame from '../Walkthrough/WalkthroughFrame'
import Card from '../Card/Card'
import FormGroup from '../Inputs/FormGroup'
import Input from '../Inputs/Input'

export default class Registration extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			username: "",
			password: "",
			retyped_password: "",
		}
	}

	render() {
		let { username, password, retyped_password } = this.state
		return (
			<WalkthroughFrame>
				<Card>
					<div>
					<FormGroup label="Username">
						<Input
							className="username"
							placeholder="letters & numbers only"
							value={username}
							onChange={(e) => this.handleInputChange(e.value, "username")}
						/>
					</FormGroup>
					<FormGroup label="Password">
						<Input
							type="password"
							placeholder="***"
							value={password}
							onChange={(e) => this.handleInputChange(e.value, "password")}
						/>
					</FormGroup>
					<FormGroup label="Retype password">
						<Input
							type="password"
							placeholder="***"
							value={retyped_password}
							onChange={(e) => this.handleInputChange(e.value, "password")}
						/>
					</FormGroup>
				</div>
				</Card>
			</WalkthroughFrame>
		)
	}

	handleInputChange(value, key) {
		this.setState({ [key]: value })
	}

}