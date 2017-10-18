import React from 'react'
import { connect } from 'react-redux'
import {Link, Redirect} from 'react-router-dom'
import * as actions from '../AccountMenu/UserActions'

class TeamSelector extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      redirectToReferrer: false,
      username: "",
      password: "",
      token: "",
      failedAuthentication: false
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    this.handleAuthenticate(this.state.username, this.state.password, this.failedAuth.bind(this))
  }

  render() {
    return (
      <div className="login">
        <div className="login-box">
          {this.state.failedAuthentication ? <span>Incorrect username or password.</span> : false }
          <form>
            <span>Welcome to Polymer. Please type in the name of your team.</span>
            <input 
              type="text" 
              value={this.state.team} 
              onChange={(e) => this.handleChange('team', e.target.value)}
              className="login-team"
              name="team" 
              placeholder="eg. myfavteam" 
            />
            <button 
              type="submit" 
              disabled={!this.state.team.length} 
              className="login-submit" 
              onClick={this.handleSubmit.bind(this)}
            >Find my team</button>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state/*, props*/) => {
  return {
    users: state.users
  }
}

const connectedLogin = connect(mapStateToProps)(Login)

export default connectedLogin