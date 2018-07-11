import React from 'react'
import FormGroup from '../Inputs/FormGroup'
import FormErrors from '../Inputs/FormErrors'
import Input from '../Inputs/Input'
import IconPicker from '../IconPicker/IconPicker'
import { Select } from 'antd'
import { WIP, FG, RM } from '../../utilities/constants'
import './styles/createprocessdialog.css'

export default function CreateOrDuplicateProcessInputForm({ icon, name, code, number, unit, outputDescription, category, submitted, onInputChange, formErrorsArray }) {
	return (
		<div>
			<NameAndAbbreviation onInputChange={onInputChange} icon={icon} code={code} name={name} />
			<OutputQuantity onInputChange={onInputChange} number={number} unit={unit}/>
			<OutputDescription onInputChange={onInputChange} outputDescription={outputDescription} />
			<Category onInputChange={onInputChange} category={category}/>
			{submitted && <FormErrors errors={formErrorsArray}/>}
		</div>
)
}

function NameAndAbbreviation({ onInputChange, icon, code, name }) {
	return (
		<div className="icon-name-abbreviation">
			<FormGroup label="Icon" className="icon-group">
				<IconPicker onChange={onInputChange} icon={icon} />
			</FormGroup>
			<FormGroup label="Name" className="name-group">
				<Input
					type="text"
					placeholder="Roast"
					className="name"
					value={name}
					onChange={(e) => onInputChange(e.target.value, "name")}
				/>
			</FormGroup>
			<FormGroup label="Abbreviation" className="abbreviation-group">
				<Input
					type="text"
					placeholder="R"
					className="abbreviation"
					value={code}
					onChange={(e) => onInputChange(e.target.value, "code")}
				/>
			</FormGroup>
		</div>
	)
}

function OutputQuantity({ onInputChange, number, unit }) {
	return (
		<FormGroup label="Approximate batch size">
			<div className="output-quantity">
				<Input
					type="number"
					className="number"
					placeholder="5"
					value={number}
					onChange={(e) => onInputChange(e.target.value, "number")}
				/>
				<Input
					type="text"
					className="unit"
					placeholder="kilograms"
					value={unit}
					onChange={(e) => onInputChange(e.target.value, "unit")}
				/>
			</div>
		</FormGroup>
	)
}

function OutputDescription({ onInputChange, outputDescription }) {
	return (
		<FormGroup label="Description">
			<Input
				type="text"
				placeholder="Roasted Beans"
				value={outputDescription}
				onChange={(e) => onInputChange(e.target.value, "outputDescription")}
			/>
		</FormGroup>
	)
}

function Category({ onInputChange, category }) {
	const Option = Select.Option;
	return (
		<FormGroup label="Category">
			<div className="process-category">
				<Select 
					labelInValue 
					defaultValue={{ key: category }} 
					style={{ fontSize:"14px" }} 
					onChange={(e) => onInputChange(e.key, "category")} 
					size="large" 
					className="select"
				>
				    <Option value={FG}>Finished Goods</Option>
				    <Option value={RM}>Raw Materials</Option>
				    <Option value={WIP}>Work In Progress</Option>
				</Select>
			</div>
		</FormGroup>
	)
}
