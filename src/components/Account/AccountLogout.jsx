import React from 'react'
import Button from '../Card/Button'
import * as actions from '../AccountMenu/UserActions'
import { connect } from 'react-redux'

function AccountLogout(props) {
	let handleLogout = function () {
		let {data, ui} = props.users
		let user = data[ui.activeUser]
		props.dispatch(actions.postRequestLogout(user, ()=>null, ()=>null))
	}

	return (
    <div className="menu-section">
      <Button secondary onClick={handleLogout}>Logout</Button>
    </div>
	)
}

const mapStateToProps = (state/*, props*/) => {
  return {
    users: state.users
  }
}

const connected = connect(mapStateToProps)(AccountLogout)
export default connected

