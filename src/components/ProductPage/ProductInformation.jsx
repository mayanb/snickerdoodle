import React from 'react'
import DeleteProduct from './DeleteProduct'
import ProductEditForm from './ProductEditForm'
import { ElementTitle } from '../Element/Element'

export default class ProductInformation extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			isEditing: false,
			...props.product,
		}
		this.handleToggleEditing = this.handleToggleEditing.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}
	
	render() {
		const { isEditing } = this.state
		const { product, onArchive, isSavingEdit } = this.props
		const { icon, code, name } = product
		return (
			<div className='product-information'>
				<ElementTitle
					icon={icon}
					text={`(${code}) ${name}`}
					buttonTitle={this.state.isEditing ? 'Cancel' : 'Edit'}
					onClick={this.handleToggleEditing}
					isLoading={isSavingEdit}
				/>
				<div className='product-basic-information-container'>
					{ isEditing ?
						<ProductEditForm onChange={this.handleChange} onSubmit={this.handleSubmit} {...this.state} isLoading={isSavingEdit} /> :
						<ProductBasicInformation { ...product } />
					}
				</div>
				<DeleteProduct onArchive={onArchive} />
			</div>
		)
	}
	
	handleToggleEditing() {
		this.setState({ isEditing: !this.state.isEditing })
	}
	
	handleChange(e, type) {
		let key = type
		this.setState({ [key] : e.target.value })
	}
	
	handleSubmit() {
		if (this.state.isSavingEdit) {
			return
		}
		let { name, code, description } = this.state
		this.props.onChange({
			name: name,
			code: code,
			description: description,
		}).then(() => this.setState({ isEditing: false }))
	}
}

function ProductBasicInformation({ code, name, description, }) {
	return (
		<div className='product-information-basic'>
			<div className='piece-of-info'>
				<span>Description</span>
				<span className={description ? 'emphasis' : 'no-description'}>{description || 'No description'}</span>
			</div>
		</div>
	)
}