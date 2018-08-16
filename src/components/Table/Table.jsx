import React from 'react'
import update from 'immutability-helper'
import './styles/table.css'

export default class Table extends React.Component {
	render() {
        let { ui, data, TitleRow, onClick, Row} = this.props
        return (
            <div className='unpaginated-table'>
                <TitleRow />
                { data && data.map((item, i) => 
                    <Row 
                        key={i}
                        item={item} 
                        onClick={onClick} 
                        isSelected={this.isSelected(i)}
                        index={i}
                    />
                )}
            </div>
        )
	}

    isSelected(i) {
        return this.props.ui.selectedItem === i
    }
}