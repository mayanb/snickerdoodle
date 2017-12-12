import React from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import Img from '../Img/Img'
import {NavLink} from 'react-router-dom'

let o1 = ["Activity Log", "Inventory"]
let l1 = ["", "inventory"]

let o2= [ "Zebra labels", "Dymo labels"]
let l2 = ["labels", "dymo"]

let o3 = ["Processes", "Products",]
let l3 = ["processes", "products",]

let o4 = ["Logs", "Inventory", "Products", "Processes"]
let l4 = ["activity", "inventory", "products", "processes"]

class Navbar extends React.Component {
  render () {
    return (
      <div className="menu">
        <ul>
          {
            o4.map(function (x, i) {
              return (
                <li key={i}>
                  <NavLink exact to={"/" + l4[i]} activeClassName={"active"}>
                  {x}
                  </NavLink>
                </li>
              )
            }, this)
          }
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state/*, props*/) => {
  return {
    users: state.users
  }
}

export default connect(mapStateToProps)(Navbar)