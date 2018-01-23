import React from 'react'
import WalkthroughCreateUser from './WalkthroughCreateUser'
import api from '../WaffleconeAPI/api'

const FETCHING = 'f'
const INVALID = 'i'
const VALID = 'v'

export default class CreateTeam extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			code_state: FETCHING,
		}
	}

	componentDidMount() {
		api.get('/ics/use-code')
			.query({code: this.props.match.params.code})
			.then((res) => {
				let validity = this.validateCodeResponse(res.body) ? VALID : INVALID
				this.setState({code_state: validity})
			})
			.catch((e) => this.setState({code_state: INVALID}))
	}

	validateCodeResponse(data) {
		return (data && data.length && !data.is_used)
	}

	render() {
		if (this.state.code_state === INVALID) {
			window.location.href = 'http://usepolymer.com'
			return null
		}

		let content = <div>Loading...</div>
		if (this.state.code_state === VALID) {
			content = <WalkthroughCreateUser />
		}

		return (
			<div className="walkthrough">
				{content}
			</div>
		)
	}

}