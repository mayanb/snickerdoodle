import React from 'react'
import {connect} from 'react-redux'
import * as actions from '../AccountMenu/UserActions'
import {BrowserRouter as Router, Route, Redirect, withRouter} from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import Teams from '../Teams/Teams'
import shouldLogin from '../AccountMenu/authentication'

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
    let {users} = rest
    rest.dispatch(actions.requestRefreshUserAccount(users.ui.activeUser))
    return <Route {...rest} render={props => ( <Component {...rest}/> )} />
  }
}



const mapStateToProps = (state/*, props*/) => {
  return {
    users: state.users
  }
}

export default connect(mapStateToProps)(PrivateRoute)
