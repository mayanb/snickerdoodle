import React from 'react'
import ReactDOM from 'react-dom'
import {Link, NavLink} from 'react-router-dom'
import Img from '../Img/Img'

var teams = {"1": "Bama", "5": "Valencia"};

function getTeam() {
  return window.localStorage.getItem("team") || "1"
}

export default class Navbar extends React.Component {

  constructor(props) {
    super(props)
    this.state = { team: getTeam() }
  }

  render () {
    let o1 = ["Activity Log", "Inventory"]
    let l1 = ["", "inventory"]

    let o2= [ "Zebra labels", "Dymo labels"]
    let l2 = ["labels", "dymo"]

    let o3 = ["Processes", "Products",]
    let l3 = ["processes", "products",]

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
            {this.renderNavigationGroup(o1, l1, null)}
            {this.renderNavigationGroup(o2, l2, "Printing")}
            {this.renderNavigationGroup(o3, l3, "My factory")}
          </div>
        </div>
      </div>
    )
  }

  renderNavigationGroup(options, links, title) {
    return (
      <div className="nav-group">
        {title?<span>{title}</span>:null}
        <ul>
        {
          options.map(function (x, i) {
            return (
            <li key={i}>
              <NavLink exact to={"/" + links[i]} activeClassName={"active"}>
              <Img src={links[i]||"activity"} className="nav-icon" />
              {x}
              </NavLink>
            </li>
            )
          }, this )
        }
        </ul>
      </div>
    )
  }
}