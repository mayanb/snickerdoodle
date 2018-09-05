import React from 'react'
import Datepicker from '../Datepicker/Datepicker.jsx'
import { Select, Input, Icon } from 'antd'
import Checkbox from '../Inputs/Checkbox'
import Button from '../Button/Button'
import './styles/activityfilters.css'
import { processProductFilter, formatOption } from '../../utilities/filters'
import { RM, WIP, FG, CATEGORY_NAME } from '../../utilities/constants'

export default class ActivityFilters extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			isDownloading: false
		}

		this.handleDatesChange = this.handleDatesChange.bind(this)
		this.handleKeywordsChange = this.handleKeywordsChange.bind(this)
		this.handleProcessTypesChange = this.handleProcessTypesChange.bind(this)
		this.handleProductTypesChange = this.handleProductTypesChange.bind(this)
		this.handleCategoryTypesChange = this.handleCategoryTypesChange.bind(this)
		this.handleTagTypesChange = this.handleTagTypesChange.bind(this)
		this.handleFlaggedOnlyChange = this.handleFlaggedOnlyChange.bind(this)
		this.handleAggregateProductsChange = this.handleAggregateProductsChange.bind(this)
		this.handleDownload = this.handleDownload.bind(this)
	}

	handleDatesChange(dates) {
		this.props.onFilterChange({ ...this.props.filters, dates: dates })
	}

	handleKeywordsChange(event) {
		this.props.onFilterChange({ ...this.props.filters, keywords: event.target.value })
	}

	handleProcessTypesChange(selectedProcesses) {
		this.props.onFilterChange({ ...this.props.filters, selectedProcesses: selectedProcesses })
	}

	handleProductTypesChange(selectedProducts) {
		this.props.onFilterChange({ ...this.props.filters, selectedProducts: selectedProducts })
	}

	handleCategoryTypesChange(selectedCategories) {
		this.props.onFilterChange({ ...this.props.filters, selectedCategories: selectedCategories })
	}

	handleTagTypesChange(selectedTags) {
		this.props.onFilterChange({ ...this.props.filters, selectedTags: selectedTags })
	}

	handleFlaggedOnlyChange(event) {
		const isChecked = event.target.checked
		this.props.onFilterChange({ ...this.props.filters, flaggedOnly: isChecked })
	}

	handleAggregateProductsChange(event) {
		const isChecked = event.target.checked
		this.props.onFilterChange({ ...this.props.filters, aggregateProducts: isChecked })
	}

	handleDownload() {
		this.setState({ isDownloading: true })
		this.props.onDownload().finally(() => this.setState({ isDownloading: false }))
	}

	render() {
		const { filters, downloadDisabled, processes, products, tags } = this.props
		const categories = [
			{ name: CATEGORY_NAME[RM], code: RM },
			{ name: CATEGORY_NAME[WIP], code: WIP },
			{ name: CATEGORY_NAME[FG], code: FG },
		]
		if (!filters.dates.start || !filters.dates.end) {
			return null
		}

		return (
			<div className="activity-filters">
				<div className="row">
					<Datepicker initialDates={filters.dates} onChange={this.handleDatesChange} />
					<div className="select-container">
						{processes.length > 0 && <Select
							mode="multiple"
							value={filters.selectedProcesses}
							allowClear
							placeholder="Filter processes"
							filterOption={processProductFilter}
							onChange={this.handleProcessTypesChange}
						>
							{processes.map(p => <Select.Option key={p.id} data={p}>
									{formatOption(p)}
								</Select.Option>
							)}
						</Select>}
					</div>
					<div className="select-container">
						{products.length > 0 && <Select
							mode="multiple"
							value={filters.selectedProducts}
							allowClear
							placeholder="Filter products"
							filterOption={processProductFilter}
							onChange={this.handleProductTypesChange}
						>
							{products.map(p => <Select.Option key={p.id} data={p}>
									{formatOption(p)}
								</Select.Option>
							)}
						</Select>}
					</div>
					<div className="select-container">
						{categories.length > 0 && <Select
							mode="multiple"
							value={filters.selectedCategories}
							allowClear
							placeholder="Filter Categories"
							filterOption={processProductFilter}
							onChange={this.handleCategoryTypesChange}
						>
							{categories.map(c => <Select.Option key={c.code} data={c}>
									{c.name}
								</Select.Option>
							)}
						</Select>}
					</div>
				</div>
				<div className="row">
					<div className="input-container">
						<Input
							placeholder="Keywords"
							prefix={<Icon type="search" />}
							value={filters.keywords}
							onChange={this.handleKeywordsChange}
						/>
					</div>
					<div className="select-container">
						{ tags.length > 0 && 
						<Select
							mode="multiple"
							value={filters.selectedTags}
							allowClear
							placeholder="Filter Tags"
							onChange={this.handleTagTypesChange}
						>
							{ tags.map(t => <Select.Option key={t.name} data={t}>{t.name}</Select.Option>) }
						</Select>
						}
					</div>
					<div className="checkboxes">
						<Checkbox
							label="Flagged Only"
							checked={filters.flaggedOnly}
							onChange={this.handleFlaggedOnlyChange}
						/>
						<Checkbox
							label="Aggregate across product types"
							checked={filters.aggregateProducts}
							onChange={this.handleAggregateProductsChange}
						/>
					</div>
					<Button onClick={this.handleDownload}
					        isLoading={this.state.isDownloading}
					        disabled={downloadDisabled}
					>
						Download All
					</Button>
				</div>
			</div>
		)
	}
}

