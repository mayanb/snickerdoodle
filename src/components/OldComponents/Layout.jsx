import React from 'react'
import ReactDOM from 'react-dom'
import {Link, NavLink} from 'react-router-dom'

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
    let options = ["Activity Log", "Inventory", "Zebra labels", "Dymo labels", "Settings", "Task View"]
    let links = ["", "inventory", "labels", "dymo", "settings", "task"]

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
            <ul>
              { 
                options.map(function (x, i) {
                  return (
                  <li key={i}> 
                    <NavLink exact to={"/" + links[i]} activeClassName={"active"}>{x}</NavLink>
                  </li>
                  )
              }, this )}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}