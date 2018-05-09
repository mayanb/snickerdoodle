import React from 'react'
import { Select } from 'antd'
import { processProductFilter, formatOption } from '../../utilities/filters'


const Option = Select.Option

export function RecipeSelect({ data, disabledOptions = {}, ...rest }) {
  return (
    <Select
      showSearch
      placeholder="Select a process"
      optionFilterProp="data"
      filterOption={processProductFilter}
      {...rest}
    >
    {data.map(e => {
      return <Option disabled={disabledOptions[e.id]} key={e.id} data={e}>
        {formatOption(e)}
        </Option>
    })}
    </Select>
  )
}

