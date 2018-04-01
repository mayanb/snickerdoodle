import React from 'react'
import Button from '../Button/Button'
import './styles/processpageeditform.css'

export default class ProcessPageEditForm extends React.Component {
	render() {
		return (
			<div className='process-edit-form'>
				<Button wide type="dark-gray">Duplicate this process</Button>
				<Button wide type="red">Delete this process</Button>
			</div>
		)
	}
}