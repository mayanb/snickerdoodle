import React from 'react'
import {Link} from 'react-router-dom'
import NavigationGroup from './NavigationGroup'
import NavigationFeedback from './NavigationFeedback'

let o1 = ["Activity Log", "Inventory"]
let l1 = ["", "inventory"]

let o2= [ "Zebra labels", "Dymo labels"]
let l2 = ["labels", "dymo"]

let o3 = ["Processes", "Products",]
let l3 = ["processes", "products",]

export default class Navbar extends React.Component {
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
          <div className="logo">
          </div>
          <div>
            <NavigationGroup options={o1} links={l1} title={null} />
            <NavigationGroup options={o2} links={l2} title={"Printing"} />
            <NavigationGroup options={o3} links={l3} title={"My factory"} />
          </div>
        </div>
        <NavigationFeedback />
      </div>
    )
  }
}