import React from 'react'
import { connect } from 'react-redux'
import FormGroup from '../Inputs/FormGroup'
import Button from '../Button/Button'
import Input from '../Inputs/Input'
import TagSelect from '../Tags/TagSelect'
import './styles/producteditform.css'

function ProductEditInfoForm({ code, name, description, isLoading, onChange, onSubmit, tags, allTags }) {
	return (
		<div className='product-edit-form'>
			<CodeAndName onChange={onChange} name={name} code={code}/>
			<Description onChange={onChange} description={description} />
			<TagSelect onChange={onChange} selectedTags={tags} allTags={allTags} />
			<FormGroup>
				<Button wide onClick={onSubmit} isLoading={isLoading}>Save changes</Button>
			</FormGroup>
		</div>
	)
}

const mapStateToProps = (state/*, props*/) => { 
	return {
		allTags: state.tags.data,
	}
}

export default connect(mapStateToProps)(ProductEditInfoForm)

function CodeAndName({ onChange, name, code }) {
	return (
		<div className='code-and-name'>
			<FormGroup label='Code' className='code-group'>
				<Input
					type='text'
					className='code'
					value={code}
					onChange={(e) => onChange(e, 'code')}
				/>
			</FormGroup>
			<FormGroup label='Name' className='name-group'>
				<Input
					type='text'
					className='name'
					value={name}
					onChange={(e) => onChange(e, 'name')}
				/>
			</FormGroup>
		</div>
	)
}

function Description({ onChange, description }) {
	return (
			<FormGroup label='Description'>
				<Input
					type='text'
					placeholder='Description of product'
					value={description}
					onChange={(e) => onChange(e.target.value, 'description')}
				/>
			</FormGroup>
	)
}
