import React from 'react'
import Teams from '../Teams/Teams'
import Button from '../Card/Button'
import ButtonDropdown from '../Card/ButtonDropdown'
import Icon from '../Card/Icon'
import Account from './Account'

export default class AccountMenu extends React.Component {

	 constructor(props) {
    super(props)

    let teams = Teams.all() || []

    this.state = { 
      teams: teams,
      activeTeam: teams.auth_active,
      expanded: false,
    }

    this.handleDropdownToggle = this.handleDropdownToggle.bind(this)
    this.handleTeamChange = this.handleTeamChange.bind(this)
  }



  /* EVENT HANDLERS */

  handleDropdownToggle() {
    this.setState({expanded: !this.state.expanded })
  }

  handleTeamChange(id) {
    this.setState({activeTeam : id})
    Teams.setActive(id)
    window.location.reload()
  }




  /* RENDERERS */

  render() {
  	let {teams, expanded, activeTeam} = this.state

    if (!teams || !activeTeam || !teams[activeTeam] || !teams[activeTeam].user)
      return null

		return (
			<ButtonDropdown 
	            secondary
	            menu
	            expanded={expanded} 
	            onToggleDropdown={this.handleDropdownToggle}
	            button={this.renderCurrentAccount()}
	          >
	            <div className="account-menu">
	              { this.renderSwitchAccounts() }
	              { this.renderAddAccount() }
	              { this.renderLogout() }
	            </div>
	          </ButtonDropdown>
		)
	}

	renderCurrentAccount() {
		let {teams, expanded, activeTeam} = this.state
		return (
			<div className="current-account">
				<Icon size="18px" />
				<span>{`${teams[activeTeam].user.first_name} ${teams[activeTeam].user.last_name}`}</span>
				<i className="material-icons">arrow_drop_down</i>
			</div>
		)
	}

	renderSwitchAccounts() {
	  let {teams, activeTeam} = this.state

	  if (Object.keys(teams).length <= 2)
	    return null

	  return (
	    <div className="menu-section">
	    <span className="account-menu-section-title">Switch Accounts</span>
	    {
	      Object.keys(teams).map(function (tid, i) {
	        if (tid == activeTeam || !teams[tid].user || !teams[tid].user.username)
	          return null
	        return <Account key={tid} onClick={(e) => this.handleTeamChange(tid)} team={teams[tid].user} />
	      }, this)
	    }
	    </div>
	  )
	}

	renderAddAccount() {
	  return (
	    <div className="menu-section">
	      <Button secondary onClick={() => window.location.href = window.location.origin + "/login"}>Add an account</Button>
	    </div>
	  )
	}

	renderLogout() {
	  return (
	    <div className="menu-section">
	      <Button secondary>Logout</Button>
	    </div>
	  )
	}

}
