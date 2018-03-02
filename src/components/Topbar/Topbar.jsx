import React from 'react'
import AccountMenu from '../AccountMenu/AccountMenu'
import TaskSelect from '../TaskSelect/TaskSelect'
import Alerts from '../Alerts/Alerts'
import './styles/topbar.css'


export default class Topbar extends React.Component {
  constructor(props) {
    super(props)
    this.handleSearch = this.handleSearch.bind(this)
  }

  handleSearch(val) {
    if (val.value && val.value !== parseInt(this.props.match.params.id, 10)) {
    	this.props.history.push(`/task/${val.value}`)
    }
  }


  render () {
    return (
      <div className="d-top">
        <div className="nav-left">
          <TaskSelect placeholder="Search for a task or QR code" onChange={this.handleSearch} />
        </div>
        <div className="nav-right">
          <Alerts />
          <div className="nav-team">
            <AccountMenu />
          </div>
        </div>
      </div>
    )
  }
}


