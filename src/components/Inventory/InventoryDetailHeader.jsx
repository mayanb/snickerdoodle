import React from 'react'
import {Link} from 'react-router-dom'

export default function InventoryDetailHeader(props) {
	return (
		<div className="i-detail-header">
  	  <div className="i-detail-outputdesc" style={{display: "flex", flexDirection: "row"}}>
    	  <span style={{flex: "1"}}>{props.output_desc}</span>
      	<span>
      		<Link to="/inventory/">
        		<i style={{verticalAlign: "middle", fontSize: "16px", flex: "0"}} className="material-icons">close</i>
      		</Link>
      	</span>
    	</div>
      <div className="i-detail-count">
        <span>{(props.count || 0) + " " + props.unit + "s"}</span>
      </div>
    </div>
  )
}