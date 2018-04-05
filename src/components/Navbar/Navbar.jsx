import React from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import NavigationGroup from './NavigationGroup'
import Img from '../Img/Img'
import './styles/navigation.css'

let group2 = [ 
  {title: 'Zebra Printing', icon: 'printing-zebra@2x', link: 'labels'},
  {title: 'Dymo Printing', icon: 'printing-dymo@2x', link: 'dymo'},
]

let group3 = [ 
  {title: 'Processes', icon: 'processes@2x', link: 'processes'},
  {title: 'Products', icon: 'products@2x', link: 'products'},
]

class Navbar extends React.Component {
  render () {
    var navbarSizeClass = "bigNav"
    if (this.props.match.params.id && this.props.match.params.section === "inventory") {
      navbarSizeClass = "littleNav"
    }

    return (
      <div className={"d-nav " + navbarSizeClass}>
        <Link className="nav-logo" to="/">
          <Img src="logo" height="64px" className="logo"/>
        </Link>
        <Link to={(this.props.match.params.section||"") + "/"} style={{"display":(navbarSizeClass==="littleNav")?"":"none"}}>
          <div className="pushout">
          </div>
        </Link>
        <div className="bar">
          <div>
            
            { this.renderActivityLogAndInventoryNavigation() }
            { this.renderPrintingNavigation() }
            { this.renderAdminNavigation() }
          </div>
        </div>
        <a href="https://polymer.helpscoutdocs.com" target="_blank" rel="noopener noreferrer" className="navbar-help"><i className="material-icons">help_outline</i></a>
      </div>
    )
  }

  renderAdminNavigation() {
    let {data, ui} = this.props.users
    let account_type = data[ui.activeUser].user.account_type
    if (account_type === 'a')
      return ( <NavigationGroup group={group3} title={"My factory"} /> )
    return null
  }

  renderPrintingNavigation() {
    let {data, ui} = this.props.users
    let team = data[ui.activeUser].user.team_name
    if (team === 'alabama' || team === 'valencia')
      return ( <NavigationGroup group={group2} title={"Printing"} /> )
    return null
  }

  renderActivityLogAndInventoryNavigation() {
    let group1 = [
      {title: 'Dashboard', icon: 'dashboard@2x', link: ''},
      {title: 'Activity Log', icon: 'activity@2x', link: 'activity-log'},
    ]
    group1.push({title: 'Inventory', icon: 'inventory@2x', link: 'inventory'})
    return <NavigationGroup group={group1} title={null} />

  }
}

const mapStateToProps = (state/*, props*/) => {
  return {
    users: state.users
  }
}

export default connect(mapStateToProps)(Navbar)