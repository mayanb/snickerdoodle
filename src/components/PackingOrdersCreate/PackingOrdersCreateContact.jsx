import React from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'
import * as actions from '../PackingOrders/PackingOrdersActions.jsx'

export default function PackingOrdersCreateContact(props) {
	return (
		<div className="contact">
			<span className="dialog-input-label">Ship to</span>
			<div style={{display: "flex", paddingRight:"16px"}}>
				<div style={{flex: 2, paddingRight: "12px"}}>
					<Select
						openOnFocus
						value={props.selected_contact}
						options={props.contacts}
						labelKey={'name'}
						valueKey={'id'}
						placeholder="Select a contact for this order"
						onChange={props.onChange}
					/>
				</div>
				<div style={{flex: 1, paddingRight: "12px"}} />
			</div>
		</div>
	)
}