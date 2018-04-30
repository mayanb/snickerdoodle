import React from 'react'
import { Select } from 'antd'


const Option = Select.Option

export function RecipeSelect({ data, disabledOptions = {}, ...rest }) {
  return (
    <Select
      showSearch
      placeholder="Select a process"
      optionFilterProp="data"
      filterOption={filterOption}
      {...rest}
    >
    {data.map(e => {
      return <Option disabled={disabledOptions[e.id]} key={e.id} value={e.id} data={e}>{e.code} - {e.name}</Option>
    })}
    </Select>
  )
}

function filterOption(input, option) {
  let searchStr = option.props.data.search + " " + option.props.data.name + " " + option.props.data.code
  searchStr = searchStr.toLowerCase()
  return searchStr.indexOf(input.toLowerCase()) >= 0
}