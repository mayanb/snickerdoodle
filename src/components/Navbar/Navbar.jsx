import React from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import NavigationGroup from './NavigationGroup'
import NavigationFeedback from './NavigationFeedback'
import Img from '../Img/Img'

let o1 = ["Activity Log", "Inventory"]
let l1 = ["", "inventory"]

let o2= ["DYMO Labels", "Zebra Labels"]
let l2 = ["dymo", "zebra"]

let o3 = ["Processes", "Products",]
let l3 = ["processes", "products",]

class Navbar extends React.Component {
  render () {
    var navbarSizeClass = "bigNav"
    if (this.props.match.params.id && this.props.match.params.section == "inventory") {
      navbarSizeClass = "littleNav"
    }

    return (
      <div className={"d-nav " + navbarSizeClass}>
        <Link to={(this.props.match.params.section||"") + "/"} style={{"display":(navbarSizeClass=="littleNav")?"":"none"}}>
          <div className="pushout">
          </div>
        </Link>
        <div className="bar">
          <div className="logo" style={{display:"flex", justifyContent: "center", "alignItems": "center"}}>
            <Img src="logo" style={{height: "96px"}}/>
          </div>
          <div>
            <NavigationGroup options={o1} links={l1} title={"Production"} />
            <NavigationGroup options={o2} links={l2} title={"Printing"} />
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
    if (account_type == 'a')
      return ( <NavigationGroup options={o3} links={l3} title={"Factory"} /> )
    return null
  }
}

const mapStateToProps = (state/*, props*/) => {
  return {
    users: state.users
  }
}

export default connect(mapStateToProps)(Navbar)
