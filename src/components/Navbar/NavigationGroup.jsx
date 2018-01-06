import React from 'react'
import Img from '../Img/Img'
import {NavLink} from 'react-router-dom'

export default function NavigationGroup(props) {
	let {options, links, title} = props

  return (
    <div className="nav-group">
      {title?<span>----------------</span>:null}
      <ul>
      {
        options.map(function (x, i) {
          return (
          <li key={i}>
            <NavLink exact to={"/" + links[i]} activeClassName={"active"}>
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

// <Img src={links[i]||"activity"} className="nav-icon" />