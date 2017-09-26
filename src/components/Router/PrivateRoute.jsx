import React from 'react'
import {connect} from 'react-redux'
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
    return <Route {...rest} render={props => ( <Component {...rest}/> )} />
  }

  // let authorizedAccount = rest.users.ui.activeUser
  // let isAddingAccount = rest.users.ui.isAddingAccount
  // try {
  //   let jwt = rest.users.data[authorizedAccount].token
  //   let unexpired = jwt && (jwt_decode(jwt).exp > unix)

  //   return (
  //     <Route {...rest} render={props => (
  //       (unexpired && !isAddingAccount) ? (
  //         <Component {...rest}/>
  //       ) : (
  //         <Redirect to={{
  //         pathname: '/login',
  //         state: { from: props.location }
  //         }}/>
  //       )
  //     )}/>
  //   )
  // } catch (e) {
  //   return ( 
  //     <Route {...rest} render={props => (
  //         <Redirect to={{
  //           pathname: '/login',
  //           state: { from: props.location }
  //           }}/>
  //       )
  //     }/>
  //   )
  // }
}



const mapStateToProps = (state/*, props*/) => {
  return {
    users: state.users
  }
}

export default connect(mapStateToProps)(PrivateRoute)
