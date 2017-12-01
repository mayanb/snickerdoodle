import React from 'react'
import {connect} from 'react-redux'
import * as actions from '../AccountMenu/UserActions'
import {BrowserRouter as Router, Route, Redirect, withRouter} from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import Teams from '../Teams/Teams'
import {shouldLogin, shouldRefresh} from '../../authentication/authentication'

function PrivateRoute({component: Component, ...rest}) {
  Component = withRouter(Component)
  let unix = Math.round(+new Date()/1000);

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
    return <Route {...rest} render={props => ( <Component {...rest}/> )} />
  }
}


const mapStateToProps = (state/*, props*/) => {
  return {
    users: state.users
  }
}

export default connect(mapStateToProps)(PrivateRoute)
