import React from 'react'
import Button from '../Button/Button'
import './styles/deleteproduct.css'

export default class DeleteProduct extends React.Component {
	render() {
		return (
			<div className='delete-product-button'>
				<Button wide type='red' onClick={this.props.onArchive}>Delete this process</Button>
			</div>
		)
	}
}