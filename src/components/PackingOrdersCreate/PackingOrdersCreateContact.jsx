import React from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'
import * as actions from '../PackingOrders/PackingOrdersActions.jsx'

export default function PackingOrdersCreateContact(props) {
	return (
		<Select
			openOnFocus
			value={props.selected_contact}
			options={props.contacts}
			labelKey={'name'}
			valueKey={'id'}
			placeholder="Select a contact for this order"
			onChange={props.onChange}
		/>
	)
}