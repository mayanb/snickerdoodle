import React from 'react'
import {connect} from 'react-redux'
import {BrowserRouter as Router, Route, Redirect, withRouter} from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import Teams from '../Teams/Teams'
import shouldLogin from '../AccountMenu/authentication'
import api from '../WaffleconeAPI/api'

class PrivateRoute extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isValidatingTeam: true, 
      isValidTeam: false,
      team: window.location.pathname.split('/')[1]
    }

  }

  componentDidMount() {
    let c = this
    api.get('/ics/teams')
      .query({team_name: this.state.team})
      .end(function (err, res) {
        if (!err && res.ok) {
          console.log("boo")
          if (res.body && res.body.length > 0) {
            console.log('hi')
            c.setState({"isValidatingTeam": false, "isValidTeam": true})
            return 
          }
        }
        c.setState({isValidatingTeam: false, isValidTeam: false})
        window.location = window.location.origin
      })
  }

  render() {
    let {component: Component, ...rest} = this.props

    if (this.state.isValidatingTeam) {
      return <span>Loading...</span>
    }

    if (this.state.isValidTeam) {
      Component = withRouter(Component)
      let unix = Math.round(+new Date()/1000);

      if (shouldLogin(rest.users, this.state.team)) {
        return (
          <Route {...rest} render={props => (
            <Redirect to={{
              pathname: `/${this.state.team}/login`,
              state: { from: props.location }
              }}/>
            )
          }/>
        )
      } else {
        return <Route {...rest} render={props => ( <Component {...rest}/> )} />
      }
    }

    return <span>You've found a bug :( </span>

  }

}



const mapStateToProps = (state/*, props*/) => {
  return {
    users: state.users
  }
}

export default connect(mapStateToProps)(PrivateRoute)
