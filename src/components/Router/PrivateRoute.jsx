import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../AccountMenu/UserActions'
import { Route, Redirect } from 'react-router-dom'
import { shouldLogin, shouldRefresh, shouldCompleteWalkthrough } from '../../authentication/authentication'

class PrivateRoute extends React.Component {

	render() {
		let { component, users, dispatch } = this.props

		if (shouldLogin(users)) {
			return (
				<Route render={props => (
					<Redirect to={{
						pathname: '/login',
						state: { from: props.location }
					}} />
				)
				} />
			)
		} else {
			if (shouldRefresh(users)) {
				dispatch(actions.requestRefreshUserAccount(users.ui.activeUser))
			}

			if (shouldCompleteWalkthrough(users)) {
				return (
					<Route render={props => (
						<Redirect to={{
							pathname: '/introduction',
							state: { from: props.location }
						}} />
					)
					} />
				)
			}

			return <Route component={component} />
		}
	}
}


const mapStateToProps = (state/*, props*/) => {
	return {
		users: state.users
	}
}

export default connect(mapStateToProps)(PrivateRoute)
