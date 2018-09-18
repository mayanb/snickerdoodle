import React from 'react'
import FormGroup from '../Inputs/FormGroup'
import { Select } from 'antd'

export default function TagSelect({ onChange, selectedTags, allTags }) {
	const Option = Select.Option
	const tagNames = selectedTags ? selectedTags.map(t => t.name) : []
	const allTagsNames = allTags ? allTags.map(t => t.name) : []
	return (
		<FormGroup label="Tags">
			<Select 
				mode="tags"
				size="large"
				style={{ width: '100%' }}
				placeholder="Select Tags"
				defaultValue={tagNames}
				onChange={ e => {
					const formatted = []
					e.forEach(tagName => {
						formatted.push({'name': tagName})
					})
					onChange(formatted, 'tags')
				}}
			>
				{ allTagsNames && allTagsNames.map(tagName => <Option key={tagName}>{tagName}</Option>) }
			</Select>
		</FormGroup>
	)
}