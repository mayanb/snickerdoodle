import React from 'react'
import Spinner from 'react-spinkit'
import './styles/table.css'

export default class Table extends React.Component {
	render() {
        let { data, TitleRow, onRowSelect, rowContext, Row, isFetchingData } = this.props
        return (
            <div className='unpaginated-table-container'>
                { isFetchingData ? 
                    <Spinner name="circle"/> :
                    <div className='unpaginated-table'>
                        <TitleRow />
                        { data && data.map((item, i) => 
                            <Row 
                                key={i}
                                item={item} 
                                onRowSelect={onRowSelect} 
                                isSelected={this.isSelected(i)}
                                index={i}
                                context={rowContext}
                            />
                        )}
                    </div>
                }
            </div>
        )
	}

    isSelected(i) {
        return this.props.ui.selectedItem === i
    }
}