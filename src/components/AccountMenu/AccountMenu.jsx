import React from 'react'
import Button from '../Card/Button'
import ButtonDropdown from '../Card/ButtonDropdown'
import Icon from '../Card/Icon'
import Account from './Account'
import {Link} from 'react-router-dom'
import * as actions from './UserActions'
import { connect } from 'react-redux'
import './styles/accounts.css'
import './styles/menu.css'

class AccountMenu extends React.Component {

	constructor(props) {
    super(props)

    this.state = {expanded: false}

    this.handleDropdownToggle = this.handleDropdownToggle.bind(this)
    this.handleTeamChange = this.handleTeamChange.bind(this)
    this.handleAddAccount = this.handleAddAccount.bind(this)
  }

  /* EVENT HANDLERS */

  handleDropdownToggle() {
    this.setState({expanded: !this.state.expanded })
  }

  handleTeamChange(id) {
    this.props.dispatch(actions.switchActiveUser(id))
	  this.handleDropdownToggle()
  }

  /* RENDERERS */

  render() {
  	let {data, ui} = this.props.users
  	let {expanded} = this.state

    if (!data || !ui.activeUser || !data[ui.activeUser] || !data[ui.activeUser].user)
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
		let {data, ui} = this.props.users

		return (
			<div className="current-account account">
				<div>
					<Icon size="32px" content={data[ui.activeUser].user.username_display}/>
				</div>
				<div>
					<span className="name">{data[ui.activeUser].user.team_name}</span>
					<span className="username">{`@${data[ui.activeUser].user.username_display}`}</span>
				</div>
				<i className="material-icons">arrow_drop_down</i>
			</div>
		)
	}

	renderSwitchAccounts() {
	  let {data, ui} = this.props.users

	  if (Object.keys(data).length <= 1)
	    return null

	  return (
	    <div className="menu-section">
	    <span className="account-menu-section-title">Switch accounts</span>
	    {
	      Object.keys(data).map(function (tid, i) {
	        if (tid === ui.activeUser || !data[tid].user || !data[tid].user.username)
	          return null
	        return <Account key={tid} onClick={(e) => this.handleTeamChange(tid)} user={data[tid].user} />
	      }, this)
	    }
	    </div>
	  )
	}

	renderAddAccount() {
	  return (
	    <div className="menu-section">
	      <Button secondary onClick={this.handleAddAccount}>Log into another account</Button>
	    </div>
	  )
	}

	renderLogout() {
	  return (
	    <div className="menu-section">
		    <Link to="/account" onClick={this.handleDropdownToggle}>
			    <Button secondary>Account settings</Button>
		    </Link>
	    </div>
	  )
	}

	handleAddAccount(id) {
		this.props.dispatch(actions.addUserAccount())
	}

}

const mapStateToProps = (state/*, props*/) => {
  return {
    users: state.users
  }
}

const connectedAccountMenu = connect(mapStateToProps)(AccountMenu)

export default connectedAccountMenu
