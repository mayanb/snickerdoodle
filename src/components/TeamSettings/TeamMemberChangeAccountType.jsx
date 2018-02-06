import React from 'react'
import {connect} from 'react-redux'
import {isAdmin} from '../../authentication/authentication'
import * as actions from './MemberActions'
import * as userActions from '../AccountMenu/UserActions'
import ButtonDropdown from '../Card/ButtonDropdown'

let adminDesc = "Admins can make changes to the factory settings."
let regularDesc = "Regular users can only create and edit tasks."

class TeamMemberChangeAccountType extends React.Component {
	constructor(props) {
		super(props)
		this.state = {expanded: false}
	}

	render() {
		return (
			<ButtonDropdown 
	      secondary
	      menu
	      expanded={this.state.expanded} 
	      onToggleDropdown={this.handleDropdownToggle.bind(this)}
	      button={this.renderButton()}
	    >
	      <div className="accounttype-menu">
	        { this.renderOption("Administrator", adminDesc, 'a', this.props.member.account_type === 'a') }
	        <div className="accounttype-rule" />
	        { this.renderOption("Regular", regularDesc, 'w', this.props.member.account_type === 'w') }
	      </div>
	    </ButtonDropdown>
	  )
	}

	handleDropdownToggle() {
		this.setState({expanded: !this.state.expanded})
	}

	renderButton() {
		return (
			<span className="btn">
				{isAdmin(this.props.member)?"Administrator":"Regular"} 
				<i className="material-icons">expand_more</i>
			</span>
		)
	}

	renderOption(title, desc, value, isCurrent) {
		return (
			<div className="accounttype-option" onClick={() => this.handleOptionSelect(value)}>
				<div className="check">
					{isCurrent ? <i className="material-icons">check</i> : null}
				</div>
				<div className="content">
					<span className="title">{title}</span>
					<span className='desc'>{desc}</span>
				</div>
			</div>
		)
	}

	handleOptionSelect(value) {
		let data = {id: this.props.member.id, new_account_type: value}
		let c = this
		this.props.dispatch(actions.postRequestEditAccountType(this.props.index, data, () => {
			if (data.id === this.props.users.ui.activeUser) {
				this.props.dispatch(userActions.requestRefreshUserAccount(data.id))
			}
			c.handleDropdownToggle()
		}))
	}
}

const mapStateToProps = (state/*, props*/) => {
  return {
  	users: state.users,
  }
}


export default connect(mapStateToProps)(TeamMemberChangeAccountType)