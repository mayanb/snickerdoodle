import React from 'react'
import {BrowserRouter as Router, Route, Redirect, withRouter} from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import Teams from '../Teams/Teams'


export default function PrivateRoute({component: Component, ...rest}) {

  Component = withRouter(Component)

  let authorizedAccount = findAuthorizedAccount()
  if (authorizedAccount != null) {
    Teams.setActive(authorizedAccount)
    return (
      <Route {...rest} render={props => <Component {...rest}/> } />
    )
  }


  return (
    <Route {...rest} render={props => (
        <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }}/>
      )
    }/>
  )
}

function findAuthorizedAccount() {
  let teams = Teams.all()
  if (!teams)
    return null 

  if (teams.auth_active) {
    let default_team = teams[teams.auth_active]

    if(default_team && hasValidToken(default_team))
      return default_team.user.pk
  }

  for (var team of teams) {
    if(hasValidToken(team))
      return team.user.pk
  }

  return null
}

function hasValidToken(team) {
  let unix = Math.round(+new Date()/1000);
  if (team && team.token) {
    let exp = jwt_decode(team.token).exp
    return exp && exp > unix
  }
  return false
}
