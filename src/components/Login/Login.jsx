import React from 'react'
import { connect } from 'react-redux'
import {Link, Redirect} from 'react-router-dom'
import * as actions from '../AccountMenu/UserActions'
import shouldLogin from '../AccountMenu/authentication'

class Login extends React.Component {
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

  handleChange(which, val) {
    this.setState({[which] : val})
  }

  handleSubmit(e) {
    e.preventDefault()
    this.handleAuthenticate(this.state.username, this.state.password, this.failedAuth.bind(this))
  }

  failedAuth() {
  }

  handleAuthenticate() {
    let fail = this.failedAuth.bind(this)
    this.props.dispatch(
      actions.postRequestLogin(
        {username: this.state.username, password: this.state.password},
        () => null, 
        fail
      )
    )
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
      <div className="login">
        <div className="login-box">
          {this.state.failedAuthentication ? <span>Incorrect username or password.</span> : false }
          <form>
            <span>Welcome to Polymer.</span>
            <input 
              type="text" 
              value={this.state.username} 
              onChange={(e) => this.handleChange('username', e.target.value)}
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
            <button 
              type="submit" 
              disabled={!this.state.username.length || !this.state.password.length} 
              className="login-submit" 
              onClick={this.handleSubmit.bind(this)}
            >Log in</button>
          </form>
        </div>
      </div>
    )
  }
}

//   render() {
//     const { from } = this.props.location.state || { from: { pathname: '/' } }
//     const { redirectToReferrer } = this.state
    
//     if (redirectToReferrer) {
//       return (
//         <Redirect to={from}/>
//       )
//     }

//     return (
//       <div className="login-box">
//         <h1>Log in</h1>
//         {this.state.failedAuthentication ? <span>Incorrect username or password.</span> : false }
//         <form>
//           <input 
//             type="text" 
//             value={this.state.username} 
//             onChange={(e) => this.handleChange('username', e.target.value)}
//             className="login-username"
//             name="username" 
//             placeholder="username" 
//           />
//           <input 
//             type="password" 
//             value={this.state.password} 
//             onChange={(e) => this.handleChange('password', e.target.value)}
//             className="login-password"
//             name="password" 
//             placeholder="password" 
//           />
//           <button 
//             type="submit" 
//             disabled={!this.state.username.length || !this.state.password.length} 
//             className="login-submit" 
//             onClick={this.handleSubmit.bind(this)}
//           >Log in</button>
//         </form>
//       </div>
//     )
//   }
// }
// function authenticate(username, password, success, fail) {
//   let params = {username: username, password: password}

//   api.post("/auth/login/")
//     .send(params)
//     .end(function (err, res) {
//       if (err || !res.ok) {
//         fail()
//         return
//       }
//       Teams.save(res.body)
//       Teams.setActive(res.body.user.pk)
//       success()
//     })
// }

const mapStateToProps = (state/*, props*/) => {
  return {
    users: state.users
  }
}

const connectedLogin = connect(mapStateToProps)(Login)

export default connectedLogin