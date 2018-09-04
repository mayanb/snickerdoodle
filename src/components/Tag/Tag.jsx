import React from 'react'
import { Tag as AntdTag } from 'antd'
import { colorHash } from '../../utilities/stringutils'

export default function Tag({style, name, ...rest}) {
    return (
        <div className='tag'>
            <AntdTag color={colorHash(name)} style={{textAlign:'left', fontSize:'11px', ...style}} {...rest}>
                {name}
            </AntdTag>
        </div>
    )
}