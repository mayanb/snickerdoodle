import React from 'react'
import { connect } from 'react-redux'
import {Link, Redirect} from 'react-router-dom'
import * as actions from './TeamSelectorActions'

class TeamSelector extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      team: "", 
      failedAuthentication: false
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    let c = this
    this.props.dispatch(actions.getTeam(this.state.team, function () {
      // console.log(team_data["name"])
      let team_data = c.props.teams.data
      if( !team_data || team_data.length == 0 ) {
        c.setState({"failedAuthentication": true, "team": ""})
      }
      else {
        c.setState({"failedAuthentication": false})
        let redirectURL = `${window.location.origin}/${c.state.team}/`
        window.location = redirectURL
      }
      // this.setState({"failedAuthentication": true})
    }))
  }


  handleChange(key, val) {
    this.setState({[key]: val})
  }

  render() {
    return (
      <div className="login">
        <div className="login-box">
          {this.state.failedAuthentication ? <span>We couldn't find any teams of that name. Please try again.</span> : false }
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
    users: state.users,
    teams: state.teams,
    team: state.team
  }
}

const connectedTeamSelector = connect(mapStateToProps)(TeamSelector)

export default connectedTeamSelector