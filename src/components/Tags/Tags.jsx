import React from 'react'
import Tag from '../Tag/Tag'
import './styles/tags.css'

export default function Tags({style, tags, ...rest}) {
    return (
        <div className='tags-list-container' style={style}>
            { tags && tags.length > 0 && tags.map(tag => <Tag name={tag.name} />) }
        </div>
    )
}