import React from 'react'
import Teams from '../Teams/Teams'
import Button from '../Card/Button'
import ButtonDropdown from '../Card/ButtonDropdown'
import Icon from '../Card/Icon'
import Account from './Account'
import api from '../WaffleconeAPI/api'
import * as actions from './UserActions'
import { connect } from 'react-redux'

class AccountMenu extends React.Component {

	 constructor(props) {
    super(props)

    this.state = {expanded: false}

    this.handleDropdownToggle = this.handleDropdownToggle.bind(this)
    this.handleTeamChange = this.handleTeamChange.bind(this)
    this.handleAddAccount = this.handleAddAccount.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }



  /* EVENT HANDLERS */

  handleDropdownToggle() {
    this.setState({expanded: !this.state.expanded })
  }

  handleTeamChange(id) {
    this.props.dispatch(actions.switchActiveUser(id))
  }

  /* RENDERERS */
			// <ButtonDropdown 
	  //           secondary
	  //           menu
	  //           expanded={expanded} 
	  //           onToggleDropdown={this.handleDropdownToggle}
	  //           button={this.renderCurrentAccount()}
	  //         >
	  //           <div className="account-menu">
	  //             { this.renderSwitchAccounts() }
	  //             { this.renderAddAccount() }
	  //             { this.renderLogout() }
	  //           </div>
	  //         </ButtonDropdown>
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
	              { this.renderLogout() }
	            </div>
	          </ButtonDropdown>
		)
	}

	renderCurrentAccount() {
		let {data, ui} = this.props.users

		return (
			<div className="current-account">
				<Icon size="18px" />
				<span>{`${data[ui.activeUser].user.team_name} |  @${data[ui.activeUser].user.username}`}</span>
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
	    <span className="account-menu-section-title">Switch Accounts</span>
	    {
	      Object.keys(data).map(function (tid, i) {
	        if (tid == ui.activeUser || !data[tid].user || !data[tid].user.username)
	          return null
	        return <Account key={tid} onClick={(e) => this.handleTeamChange(tid)} user={data[tid].user} />
	      }, this)
	    }
	    </div>
	  )
	}

	renderTeamSettings() {
	  return (
	    <div className="menu-section">
	      <Button secondary onClick={() => window.location.href= '/team'}>Team settings</Button>
	    </div>
	  )
	}

	renderAddAccount() {
	  return (
	    <div className="menu-section">
	      <Button secondary onClick={this.handleAddAccount}>Add an account</Button>
	    </div>
	  )
	}

	renderLogout() {
	  return (
	    <div className="menu-section">
	      <Button secondary onClick={this.handleLogout}>Logout</Button>
	    </div>
	  )
	}

	handleAddAccount(id) {
		this.props.dispatch(actions.addUserAccount())
	}

	handleLogout() {
		let {data, ui} = this.props.users
		let user = data[ui.activeUser]
		this.props.dispatch(actions.postRequestLogout(user, ()=>null, ()=>null))
	}

}

const mapStateToProps = (state/*, props*/) => {
  return {
    users: state.users
  }
}

const connectedAccountMenu = connect(mapStateToProps)(AccountMenu)

export default connectedAccountMenu
