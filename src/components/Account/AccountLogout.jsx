import React from 'react'
import Button from '../Card/Button'
import * as actions from '../AccountMenu/UserActions'

export default function AccountLogout() {
	let handleLogout = function () {
		let {data, ui} = this.props.users
		let user = data[ui.activeUser]
		this.props.dispatch(actions.postRequestLogout(user, ()=>null, ()=>null))
	}

	return (
    <div className="menu-section">
      <Button secondary onClick={handleLogout}>Logout</Button>
    </div>
	)
}

