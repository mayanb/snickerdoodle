import React from 'react'
import { Select } from 'antd'


const Option = Select.Option

export function RecipeSelect({ data, ...rest }) {
  return (
    <Select
      showSearch
      placeholder="Select a process"
      optionFilterProp="data"
      filterOption={filterOption}
      {...rest}
    >
    {data.map(e => {
      return <Option disabled={e.disabled} key={e.id} value={e.id} data={e}>{e.code} - {e.name}</Option>
    })}
    </Select>
  )
}

function filterOption(input, option) {
  return option.props.data.name.toLowerCase().indexOf(input.toLowerCase()) >= 0
}