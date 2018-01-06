import React from 'react'
import ButtonDropdown from '../Card/ButtonDropdown'
import Alerts from './Alerts'

export default class AlertDropdown extends React.Component {
	constructor(props) {
		super(props)
		this.state = {expanded: false}

		this.handleDropdownToggle = this.handleDropdownToggle.bind(this)
	}

	 

	handleDropdownToggle() {
    this.setState({expanded: !this.state.expanded })
  }

	render() {
		let {expanded} = this.state
		return (
			<ButtonDropdown 
        secondary
        menu
        expanded={expanded} 
        onToggleDropdown={this.handleDropdownToggle}
        button={<i className="material-icons">notifications_none</i>}
      >
        <div className="account-menu">
          <Alerts />
        </div>
      </ButtonDropdown>
		)
	}
}