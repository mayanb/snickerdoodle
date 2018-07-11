import React from 'react'
import { Tag } from 'antd'
import { CATEGORY_NAME, CATEGORY_COLOR } from '../../utilities/constants'

export default function CategoryTag({styles, category, ...rest}) {
    const categoryName = CATEGORY_NAME.get(category)
    const categoryColor = CATEGORY_COLOR.get(category)
    return (
        <Tag color={categoryColor} style={{textAlign:'left', fontSize:'11px', ...styles}} {...rest}>
            {categoryName}
        </Tag>
    )
}