import React from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import NavigationGroup from './NavigationGroup'
import NavigationFeedback from './NavigationFeedback'
import './styles/navigation.css'

let o1 = ["Activity Log", "Inventory"]
let l1 = ["", "inventory"]

let o2= [ "Zebra labels", "Dymo labels"]
let l2 = ["labels", "dymo"]

let o3 = ["Processes", "Products",]
let l3 = ["processes", "products",]

class Navbar extends React.Component {
  render () {
    var navbarSizeClass = "bigNav"
    if (this.props.match.params.id && this.props.match.params.section === "inventory") {
      navbarSizeClass = "littleNav"
    }

    return (
      <div className={"d-nav " + navbarSizeClass}>
        <Link to={(this.props.match.params.section||"") + "/"} style={{"display":(navbarSizeClass==="littleNav")?"":"none"}}>
          <div className="pushout">
          </div>
        </Link>
        <div className="bar">
          <div>
            <NavigationGroup options={o1} links={l1} title={null} />
            { this.renderPrintingNavigation() }
            { this.renderAdminNavigation() }
          </div>
        </div>
        <NavigationFeedback />
      </div>
    )
  }

  renderAdminNavigation() {
    let {data, ui} = this.props.users
    let account_type = data[ui.activeUser].user.account_type
    if (account_type === 'a')
      return ( <NavigationGroup options={o3} links={l3} title={"My factory"} /> )
    return null
  }

  renderPrintingNavigation() {
    let {data, ui} = this.props.users
    let team = data[ui.activeUser].user.team_name
    if (team === 'alabama' || team === 'valencia')
      return ( <NavigationGroup options={o2} links={l2} title={"Printing"} /> )
    return null
  }
}

const mapStateToProps = (state/*, props*/) => {
  return {
    users: state.users
  }
}

export default connect(mapStateToProps)(Navbar)