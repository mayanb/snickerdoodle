import React from 'react'
import { Select } from 'antd'


const Option = Select.Option

export function RecipeSelect({ data, disabled = {}, ...rest }) {
  return (
    <Select
      showSearch
      placeholder="Select a process"
      optionFilterProp="data"
      filterOption={filterOption}
      {...rest}
    >
    {data.map(e => {
      return <Option disabled={disabled[e.id]} key={e.id} value={e.id} data={e}>{e.code} - {e.name}</Option>
    })}
    </Select>
  )
}

function filterOption(input, option) {
  return option.props.data.name.toLowerCase().indexOf(input.toLowerCase()) >= 0
}