import React from 'react'
import { USERNAME_REGEX } from '../../utilities/constants'
import api from '../WaffleconeAPI/api'
import RegistrationForm from './RegistrationForm'
import './styles/registration.css'

export default class Registration extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			username: "",
			password: "",
			retyped_password: "",
			isFetchingInitialData: false,
			userprofile: null,
			errors: null,
		}

		this.handleInputChange = this.handleInputChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	componentDidMount() {
		this.getUserprofileData()
	}

	render() {
		let { 
			isFetchingInitialData, 
			userprofile,
			errors
		} = this.state

		if (isFetchingInitialData) {
			return <div>Loading...</div>
		} else if (!userprofile) {
			return <div>Error</div>
		} else {
			return(
				<RegistrationForm 
					{...this.state} 
					onChange={this.handleInputChange}
					onSubmit={this.handleSubmit}
					errors={ errors && this.formErrors() }
				/>
			)
		}
	}

	handleInputChange(value, key) {
		this.setState({ [key]: value })
	}

	handleSubmit() {
		this.setState({ errors: this.formErrors() })
		// save the username and password
		// go to login page??
	}

	formErrors() {
		const errors = []
		let { username, password, retyped_password } = this.state

		if (!username || !password ) {
			errors.push("Please make sure you've entered a username and password.")
		}

		if (!USERNAME_REGEX.test(username)) {
			errors.push("Please enter a username containing only numbers and letters.")
		}

		if (password !== retyped_password) {
			errors.push("Both passwords must match.")
		}

		return errors
	}

	getUserprofileData() {
		let { userprofile_id } = this.props.match.params
		this.setState({ isFetchingInitialData: true })
		api.get(`/ics/userprofiles/${userprofile_id || 14}`)
			.then(res => {
				this.setState({ 
					isFetchingInitialData: false,
					userprofile: res.body,
				})
			}).catch(e => {
				this.setState({ isFetchingInitialData: false })
			})
	}

}