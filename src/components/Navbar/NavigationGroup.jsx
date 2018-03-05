import React from 'react'
import {NavLink} from 'react-router-dom'
import Img from '../Img/Img'

export default function NavigationGroup({group}) {

  return (
    <div className="nav-group">
      <ul>
      {
        group.map(function (x, i) {
          return (
          <li key={i}>
            <NavigationItem {...x} />
          </li>
          )
        }, this )
      }
      </ul>
    </div>
  )
}

function NavigationItem({title, link, icon}) {
  return (
    <div className="nav-tooltip">
      <NavLink exact to={"/" + link} activeClassName={"active"}>
        <Img src={icon} width="24px" className="logo"/>
      </NavLink>
      <span className="tooltiptext">{title}</span>
    </div>
  )
}

// <Img src={links[i]||"activity"} className="nav-icon" />