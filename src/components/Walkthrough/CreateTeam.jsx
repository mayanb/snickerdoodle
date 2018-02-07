import React from 'react'
import {connect} from 'react-redux'
import WalkthroughFrame from './WalkthroughFrame'
import WalkthroughCreateUser from './WalkthroughCreateUser'
import api from '../WaffleconeAPI/api'
import * as memberActions from '../TeamSettings/MemberActions'
import * as userActions from '../AccountMenu/UserActions'
import * as walkthroughActions from './WalkthroughActions'
import {Redirect} from 'react-router'
import * as processActions from '../Processes/ProcessesActions'

const FETCHING = 'f'
const INVALID = 'i'
const VALID = 'v'
const SHOULD_REDIRECT = 's'

class CreateTeam extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			code_state: FETCHING,
		}
	}

	componentDidMount() {
		api.get('/ics/is-code-available')
			.query({code: this.props.match.params.code})
			.then((res) => {
				let validity = this.validateCodeResponse(res.body) ? VALID : INVALID
				this.setState({code_state: validity})
			})
			.catch((e) => this.setState({code_state: INVALID}))
	}

	validateCodeResponse(data) {
		return (data && data.length && !data[0].is_used)
	}

	render() {
		if (this.state.code_state === SHOULD_REDIRECT) {
			return <Redirect to="/"/>
		}

		if (this.state.code_state === INVALID) {
			window.location.href = 'http://usepolymer.com'
			return null
		}

		let content = <div>Loading...</div>
		if (this.state.code_state === VALID) {
			content = <WalkthroughCreateUser onSubmit={this.handleSubmit.bind(this)}/>
		}

		return (
			<WalkthroughFrame>
				{content}
			</WalkthroughFrame>
		)
	}

	handleSubmit(data) {
		console.log(data)
		this.props.dispatch(walkthroughActions.postCreateTeam(data.team))
			.then((res) => {

				// create the user & login
				const newTeamId = res.item.id
				const newUser = Object.assign({}, data.user, { team: newTeamId })
				this.props.dispatch(memberActions.postCreateMember(newUser, () => {}))
					.then(() => this.handleLogin(data))
			})
			.catch((err) => console.log("oops"))
	}

	handleLogin(data) {
		let credentials = {
			username: data.user.username.toLowerCase() + '_' + data.team.toLowerCase(), 
			password: data.user.password
		}
		this.props.dispatch(userActions.postRequestLogin(credentials, () => this.handleMoveOn()))
	}

	handleMoveOn() {
		this.setState({code_state: SHOULD_REDIRECT})

		api.get('ics/use-code')
			.query({code: this.props.match.params.code})

			let data = {
				name: 'Label', 
				code: 'L', 
				icon: 'label.png', 
				unit: 'item', 
				output_description: 'product'
			}

		this.props.dispatch(processActions.postCreateProcess(data), () => {})
	}
}

const mapStateToProps = (state/*, props*/) => {
	return {}
}

export default connect(mapStateToProps)(CreateTeam)