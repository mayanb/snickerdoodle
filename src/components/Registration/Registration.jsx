import React from 'react'
import { connect } from 'react-redux'
import {Redirect} from 'react-router'
import * as actions from '../AccountMenu/UserActions'
import { USERNAME_REGEX } from '../../utilities/constants'
import { getStoredUsername } from '../../utilities/userutils'
import api from '../WaffleconeAPI/api'
import RegistrationForm from './RegistrationForm'
import './styles/registration.css'


class Registration extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			username: "",
			password: "",
			retyped_password: "",
			isFetchingInitialData: false,
			userprofile: null,
			errors: null,
			apiError: null,
			shouldRedirect: false,
			isSubmitting: false,
		}

		this.handleInputChange = this.handleInputChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleAuthenticate = this.handleAuthenticate.bind(this)
	}

	componentDidMount() {
		this.getUserprofileData()
	}

	render() {
		let {
			isFetchingInitialData, 
			shouldRedirect,
			userprofile,
			errors, 
			apiError
		} = this.state

		if (!isFetchingInitialData && !userprofile) {
			return <div>Error</div>
		} else if (shouldRedirect) {
			return <Redirect to='/login' />
		} else {
			return(
				<RegistrationForm 
					{...this.state} 
					onChange={this.handleInputChange}
					onSubmit={this.handleSubmit}
					errors={ errors ? this.formErrors() : [apiError] }
				/>
			)
		}
	}

	handleInputChange(value, key) {
		this.setState({ [key]: value })
	}

	handleSubmit(e) {
		let { userprofile_id } = this.props.match.params
		let { password, username } = this.state

		// make sure the HTML form element doesnt force a redirect
		e.preventDefault()

		this.setState({ errors: this.formErrors(), isSubmitting: true })
		api.put(`/ics/userprofiles/change-username-password/${userprofile_id}/`)
			.send({ new_password: password, new_username: username})
			.then(this.handleAuthenticate).catch(e => {
				this.setState({ isSubmitting: false, apiError: this.parseAPIError(e) })
			})
	}

	parseAPIError(err) {
		try {
			return Object.values(err.response.body)[0]
		} catch(e)  {
			return "Something went wrong. Try again later."
		}
	}

	handleAuthenticate() {
		let { userprofile, username, password } = this.state
		let { team_name } = userprofile
    this.props.dispatch(actions.postRequestLogin({
    	username: getStoredUsername(username, team_name), 
    	password: password
    })).then(res => {
			this.setState({ shouldRedirect: true, isSubmitting: false })
    })
  }

	formErrors() {
		const errors = []
		let { username, password, retyped_password } = this.state
		console.log(this.state)

		if (!username || !password ) {
			errors.push("Please make sure you've entered a username and password.")
		}

		if (!USERNAME_REGEX.test(username)) {
			errors.push("Please enter a username that has only numbers and letters.")
		}

		if (password !== retyped_password) {
			errors.push("Both passwords must match.")
		}

		return errors.length ? errors : null
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

const mapStateToProps = (state/*, props*/) => {
  return {}
}

export default connect(mapStateToProps)(Registration)