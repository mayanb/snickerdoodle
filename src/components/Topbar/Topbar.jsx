import React from 'react'
import ReactDOM from 'react-dom'
import ButtonDropdown from '../Card/ButtonDropdown'
import Button from '../Card/Button'
import Teams from '../Teams/Teams'
import AccountMenu from '../AccountMenu/AccountMenu'
import {TaskSelect} from '../OldComponents/Inputs'
import Img from '../Img/Img'
import AlertDropdown from '../Alerts/AlertDropdown'


export default class Topbar extends React.Component {
  constructor(props) {
    super(props)

    this.handleSearch = this.handleSearch.bind(this)
  }

  handleSearch(val) {
    if (val.value && val.value != parseInt(this.props.match.params.id)) {
      window.location.href = window.location.origin + "/task/" + val.value
    }
  }

  render () {
    return (
      <div className="d-top">
        <div className="nav-logo">
          <Img src="logo@2x" height="26px" className="logo"/>
        </div>
        <div className="nav-left">
          <TaskSelect placeholder="Search for a task or QR code" onChange={this.handleSearch} />
        </div>
          <div className="nav-team">
            <AccountMenu />
          </div>
      </div>
    )
  }
}
