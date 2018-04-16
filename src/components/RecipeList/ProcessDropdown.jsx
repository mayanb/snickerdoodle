import React from 'react'
import { Select } from 'antd'

export default function ProcessDropdown({ processes, onChange }) {
	const Option = Select.Option

  return (
    <Select
      showSearch
      size='large'
      style={{ flex: 1 }}
      optionFilterProp='data'
      onChange={onChange}
      filterOption={filterOption}
    >
    {processes.map(e => {
      return <Option key={e.id} value={e.id} data={e}>{e.code} - {e.name}</Option>
    })}
    </Select>
  )
}

function filterOption(input, option) {
	return option.props.data.name.toLowerCase().indexOf(input.toLowerCase()) >= 0
}