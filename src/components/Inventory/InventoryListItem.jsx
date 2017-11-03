import React from 'react'
import Checkbox from '../Checkbox/Checkbox'
import Img from '../Img/Img'
import moment from 'moment'

export default class InventoryListItem extends React.Component {
  render() {
    let props = this.props
    var teamStyle = {color: "rgba(0,0,0,0.3", paddingLeft: "4px", fontSize: "10px"}
    let currTeam = window.localStorage.getItem("team") || "1"
    teamStyle["display"] = currTeam==props.team_id?"none":""
    let icon = props.process_icon || "default.png" 
    return (
      <div className={"inventoryClass " + isSelected(props) + " " + isHeader(props)} onClick={props.onClick}>
        <div className="i-check">
          <Checkbox size="16px" checked={isSelected(props)} />
        </div>
        <div className="i-icon">
          <Img className="inventory-icon" src={icon.substring(0, icon.length - 4) + "@3x"} />
        </div>
        <div className="i-code">
          <span>{props.process_code || "CODE"}</span>
        </div>
        <div className="i-outputdesc">
          <span>{props.output_desc.sentenceCase()}</span>
          <span style={teamStyle}>{props.team}</span>
        </div>
        <div className="i-count">
          <span>{count(props.count)}</span>
        </div>
        <div className="i-unit">
          <span>{props.unit.sentenceCase() + "s"}</span>
        </div>
        <div className="i-date">
          <span>{props.oldest?moment(props.oldest).format('MMM YYYY'):"OLDEST"}</span>
        </div>
      </div>
    )
  }
}

function isHeader(props) {
  return (props.header == true) ? "inventoryClass-header" : ""
}

function isSelected(props) {
  if (isHeader(props))
    return false
  return (props.selected) ? "selected" : ""
}

function count(c) {
  let p = parseInt(c)
  if (p - c != 0) 
    return c
  return p
}

String.prototype.sentenceCase = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}
