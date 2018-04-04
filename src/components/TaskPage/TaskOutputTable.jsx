import React from 'react'
import {Table, subs} from './TaskHelpers'

export default function TaskOutputTable(props) {
	let users = JSON.parse(window.localStorage.getItem('users-v5'))
	let user = users.data[users.ui.activeUser].user
	let team = user.team
	return (
		<Table title={`Outputs (${(props.outputs || []).length})`}>
			{
				(props.outputs || []).map(function (item, i) {
					let isInInventory = (!item.is_used && item.team_inventory && item.team_inventory.toString() === team)
					var inventory = false
					var markAsUsed = false
					if (isInInventory) {
						inventory = <span className="items-inventory"><div className="inv-circle"/>Inventory</span>
						markAsUsed = <button className="small-mark-button" onClick={() => props.onMark(i, item.id)} >MARK AS USED</button>
					}
					return (
						<div key={item.id} className="task-attribute-table-row output-table-row">
            <span className="items-qr">
              <i className="material-icons">select_all</i>
							{subs(item.item_qr)}
							<button style={{display: "none"}}className="small-print-button">PRINT</button>
							{markAsUsed}
            </span>
							<span className="items-inventory">{inventory}</span>
						</div>
					)
				})
			}
		</Table>
	)
}
