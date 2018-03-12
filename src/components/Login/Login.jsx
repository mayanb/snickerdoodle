import React from 'react'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'
import * as actions from '../AccountMenu/UserActions'
import {shouldLogin} from '../../authentication/authentication'
import Card from '../Card/Card'
import Spinner from 'react-spinkit'
import WalkthroughFrame from '../Walkthrough/WalkthroughFrame'
import './styles/login.css'



class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      redirectToReferrer: false,
      username: "",
      password: "",
      token: "",
      team_name: "",
      failedAuthentication: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleFailedAuthentication = this.handleFailedAuthentication.bind(this)
  }

	handleChangeToLowerCase(which, val) {
  	this.handleChange(which, val.toLowerCase())
	}

  handleChange(which, val) {
    this.setState({[which] : val })
  }

  handleSubmit(e) {
    e.preventDefault()
    this.handleAuthenticate()
  }

  handleFailedAuthentication(e) {
    this.setState({failedAuthentication: this.getFailedAuthMessage(e)})
  }

  handleAuthenticate() {
    let { username, team_name } = this.state
    this.setState({failedAuthentication: null})
    this.props.dispatch(actions.postRequestLogin({ 
      username: `${username}_${team_name}`.toLowerCase(),
      password: this.state.password
    })).catch(this.handleFailedAuthentication)
  }

  render() {
     if (shouldLogin(this.props.users)) {
      return this.renderLogin()
    }
    
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    return <Redirect to={from} />
  }

  renderLogin() {
    return (
      <WalkthroughFrame>
        <div className="login-box">
        <Card>
          <form>
            <span>Welcome to Polymer.</span>
            <input 
              type="text" 
              value={this.state.team_name} 
              onChange={(e) => this.handleChangeToLowerCase('team_name', e.target.value)}
              className="login-username"
              name="team_name" 
              placeholder="team name" 
            />
            <input 
              type="text" 
              value={this.state.username} 
              onChange={(e) => this.handleChangeToLowerCase('username', e.target.value)}
              className="login-username"
              name="username" 
              placeholder="username" 
            />
            <input 
              type="password" 
              value={this.state.password} 
              onChange={(e) => this.handleChange('password', e.target.value)}
              className="login-password"
              name="password" 
              placeholder="password" 
            />
            { this.renderFailedAuthentication() }
            <button 
              type="submit" 
              disabled={!this.state.username.length || !this.state.password.length} 
              className="login-submit" 
              onClick={this.handleSubmit}
            >
            { this.renderLoginOrLoading() }
            </button>
          </form>
          </Card>
        </div>
      </WalkthroughFrame>
    )
  }

  renderLoginOrLoading() {
    if (this.props.users.ui.isLoggingIn)  {
      return <Spinner name="three-bounce" color="white"/>
    }
    return 'Log in'
  }

  renderFailedAuthentication() {
    if (this.state.failedAuthentication) {
      return (
        <span className="failMessage">{this.state.failedAuthentication}</span>
      )
    }
    return null
  }

  getFailedAuthMessage(error) {
    if (error.status === 400) {
      return "Invalid team, username, or password. Try again."
    } else {
      return "Something went wrong. Try again later."
    }
  }
}

const mapStateToProps = (state/*, props*/) => {
  return {
    users: state.users
  }
}

const connectedLogin = connect(mapStateToProps)(Login)

export default connectedLogin