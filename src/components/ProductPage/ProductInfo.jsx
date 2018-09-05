import React from 'react'
import DeleteProduct from './DeleteProduct'
import ProductEditInfoForm from './ProductEditInfoForm'
import Tags from '../Tags/Tags'
import { ElementTitle } from '../Element/Element'

export default class ProductInfo extends React.Component {
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
						<ProductEditInfoForm onChange={this.handleChange} onSubmit={this.handleSubmit} {...this.state} isLoading={isSavingEdit} /> :
						<ProductBasicInfo { ...product } />
					}
				</div>
				<DeleteProduct onArchive={onArchive} />
			</div>
		)
	}
	
	handleToggleEditing() {
		this.setState({ isEditing: !this.state.isEditing })
		if (this.state.isEditing) {
			this.setState({
				name: '',
				code: '',
				description: '',
			})
		} else {
			const { name , code, description } = this.props.product
			this.setState({
				name: name,
				code: code,
				description: description,
			})
		}
	}
	
	handleChange(value, type) {
		this.setState({ [type] : value })
	}
	
	handleSubmit() {
		if (this.props.isSavingEdit) {
			return
		}
		let { name, code, description, tags } = this.state
		this.props.onSubmitEdit({
			name: name,
			code: code,
			description: description,
			tags: tags,
		}).then(() => this.setState({ isEditing: false }))
	}
}

function ProductBasicInfo({ code, name, tags, description, }) {
	return (
		<div className='product-information-basic'>
			<div className='piece-of-info'>
				<span>Description</span>
				<span className={description ? 'emphasis' : 'no-description'}>{description || 'No description'}</span>
			</div>
			<div className="piece-of-info">
				<span>Tags</span>
				{ tags && tags.length > 0 ?
				<Tags tags={tags} style={{ marginTop: '4px' }}/> :
				<span className='no-tags'>No tags</span>
				}
			</div>
		</div>
	)
}