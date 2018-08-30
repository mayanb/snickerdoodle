import React from 'react'
import { Select } from 'antd'
import { WIP, FG, RM } from '../../utilities/constants'

export default function CategoryPicker({ onChange, category }) {
	const Option = Select.Option;
	return (
			<div className="process-category">
				<Select 
					labelInValue 
					defaultValue={{ key: category }} 
					style={{ fontSize:"14px" }} 
					onChange={onChange} 
					size="large" 
					className="select"
				>
				    <Option value={FG}>Finished Goods</Option>
				    <Option value={RM}>Raw Materials</Option>
				    <Option value={WIP}>Work In Progress</Option>
				</Select>
			</div>
	)
}