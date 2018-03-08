import React from 'react'
import update from 'immutability-helper'
import './styles/paginatedtable.css'

/*

takes in { data, ui, Row, TitleRow, onClick, onPagination }

ui = {
  page_size: INT,
  currentPage: INT,
  selectedItem: INDEX,
}

*/


export default class PaginatedTable extends React.Component {
	render() {
		let {data, ui, TitleRow} = this.props

    // TODO: change this to be if there are no items in current page && IS FETCHING 
		if (!data) {
			return <span>Loading...</span>
		}

    let keys = update(data, {})


    if (!keys || keys.length === 0) {
      return <span> No items </span>
    }

    let firstIndex = ui.currentPage * ui.page_size
    let lastIndex = Math.min(keys.length, firstIndex + ui.page_size)
    let totalLen = keys.length
   //keys = keys.slice(firstIndex, lastIndex)
   

    return (
      <div className={(this.border?"":"border-none ") + "paginated-table"}>
        <ul>
          <li className="header">
            <TitleRow />
          </li>
          {
            this.renderRows(firstIndex, lastIndex, keys)
          }
        </ul>
        { this.renderPagination(firstIndex, lastIndex, totalLen, this.handlePagination.bind(this)) }
      </div>
    )
	}

  renderRows(firstIndex, lastIndex, keys) {
    var rows = []
    for (let i=firstIndex; i < lastIndex; i++)
    {
      rows.push(<li key={i} >
                  <this.props.Row item={keys[i]} isSelected={this.isSelected(i)} onClick={(e) => this.props.onClick(i)} />
                </li>)
              
   }
   return rows
  }

	renderPagination(firstIndex, lastIndex, len, onPagination) {
		let detail = `${firstIndex+1}-${lastIndex} of ${this.props.ui.more ? 'over ' : ''}${len} items`

    let disabledBack = this.canPage(firstIndex,lastIndex, len, -1)?"":" disabled"
    let disabledFwd = this.canPage(firstIndex,lastIndex, len, +1)?"":" disabled"

    return (
      <div className="pagination">
        <span>{detail}</span>
        <i className={"pagination-arrow material-icons" + disabledBack} onClick={() => onPagination(-1)}>keyboard_arrow_left</i>
        <i className={"pagination-arrow material-icons" + disabledFwd} onClick={() => onPagination(1)}>keyboard_arrow_right</i>
      </div>
    )
	}

  isSelected(k) {
    return this.props.ui.selectedItem === k
  }


	handlePagination(direction) {
    let { ui, data } = this.props
    let firstIndex = ui.currentPage * ui.page_size
    let lastIndex = Math.min(data.length, firstIndex + ui.page_size)

    // error check just in case!!
    if (!this.canPage(firstIndex, lastIndex, data.length, direction))
      return 

    this.props.onPagination(direction)
  }

  canPage(firstIndex, lastIndex, len, direction) {
    // if im trying to go backwards but im on the first page
    if (direction === -1 && firstIndex === 0)
      return false

    // if im trying to go fowards but im on the last page
    if (direction === 1 && lastIndex >= len) {
      // if there's no more from the ui to fetch 
      if (!this.props.ui.more) {
        return false
      }
    }
    return true
  }
}