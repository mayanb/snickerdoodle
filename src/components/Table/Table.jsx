import React from 'react'
import Spinner from 'react-spinkit'
import './styles/table.css'

export default class Table extends React.Component {
	render() {
        let { data, TitleRow, onClick, Row, isFetchingData } = this.props
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
                                onClick={onClick} 
                                isSelected={this.isSelected(i)}
                                index={i}
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