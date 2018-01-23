import React from 'react'
import {connect} from 'react-redux'
import * as actions from '../AccountMenu/UserActions'
import {Route, Redirect, withRouter} from 'react-router-dom'
import {shouldLogin, shouldRefresh, shouldCompleteWalkthrough} from '../../authentication/authentication'

function PrivateRoute({component: Component, ...rest}) {
  Component = withRouter(Component)

  if (shouldLogin(rest.users)) {
    return (
      <Route {...rest} render={props => (
        <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
          }}/>
        )
      }/>
    )
  } else {
    if (shouldRefresh(rest.users)) {
      rest.dispatch(actions.requestRefreshUserAccount(rest.users.ui.activeUser))
    }

    if (shouldCompleteWalkthrough(rest.users)) {
      return (
        <Route {...rest} render={props => (
          <Redirect to={{
            pathname: '/introduction',
            state: { from: props.location }
            }}/>
          )
        }/>
      )
    }

    return <Route {...rest} render={props => ( <Component {...rest}/> )} />
  }
}


const mapStateToProps = (state/*, props*/) => {
  return {
    users: state.users
  }
}

export default connect(mapStateToProps)(PrivateRoute)
