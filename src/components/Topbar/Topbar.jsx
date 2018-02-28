import React from 'react'
import AccountMenu from '../AccountMenu/AccountMenu'
import TaskSelect from '../TaskSelect/TaskSelect'
import {Link} from 'react-router-dom'
import Img from '../Img/Img'
import Button from '../Card/Button'
import Alerts from '../Alerts/Alerts'
import './styles/topbar.css'


export default class Topbar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      expanded: false
    }

    this.handleSearch = this.handleSearch.bind(this)
    this.handleToggleAlerts = this.handleToggleAlerts.bind(this)
  }

  handleSearch(val) {
    if (val.value && val.value !== parseInt(this.props.match.params.id, 10)) {
    	this.props.history.push(`/task/${val.value}`)
    }
  }

  handleToggleAlerts() {
    this.setState({expanded: !this.state.expanded})
  }

  render () {
    return (
      <div className="d-top">
        <div className="nav-left">
          <TaskSelect placeholder="Search for a task or QR code" onChange={this.handleSearch} />
        </div>
        <div className="nav-right">
          <AlertsDropdown expanded={this.state.expanded} onToggle={this.handleToggleAlerts}/>
          <div className="nav-team">
            <AccountMenu />
          </div>
        </div>
      </div>
    )
  }
}

function AlertsDropdown({expanded, onToggle}) {
  return (
    <div className={`dropdown ${expanded && 'expanded'}`}>
      <Button link onClick={onToggle}><i className="material-icons alerts">notifications</i></Button>
      <div className="card nopadding dropdown-content">
        <Alerts />
      </div>
    </div>
  )
}
