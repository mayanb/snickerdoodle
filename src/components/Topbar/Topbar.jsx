import React from 'react'
import ReactDOM from 'react-dom'
import ButtonDropdown from '../Card/ButtonDropdown'
import Button from '../Card/Button'
import Teams from '../Teams/Teams'
import AccountMenu from '../AccountMenu/AccountMenu'


function getTeam() {
  return window.localStorage.getItem("team") || "1"
}


export default class Topbar extends React.Component {

  render () {
    return (
      <div className="d-top">
        <div className="nav-brand">POLYMER</div>
          <div className="nav-team">
          <AccountMenu />
          </div>
      </div>
    )
  }
}
