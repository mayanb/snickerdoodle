import React from 'react'
import { Table, subs } from './TaskHelpers'

export default function TaskOutputTable(props) {
	let users = JSON.parse(window.localStorage.getItem('users-v5'))
	let user = users.data[users.ui.activeUser].user
	let team = user.team
	return (
		<Table title={`Outputs (${(props.outputs || []).length})`}>
			{
				(props.outputs || []).map(function (item, i) {
					var inventory = false
					return (
						<div key={item.id} className="task-attribute-table-row output-table-row">
            <span className="items-qr">
              <i className="material-icons">select_all</i>
	            {subs(item.item_qr)}
	            <button style={{ display: "none" }} className="small-print-button">PRINT</button>
            </span>
							<span className="items-inventory">{inventory}</span>
						</div>
					)
				})
			}
		</Table>
	)
}
