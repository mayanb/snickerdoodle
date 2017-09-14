import React from 'react'


export default class PaginatedTable extends React.Component {
	render() {
		let {items, ui, Row, TitleRow} = this.props
		if (!items) {
			return <span>Loading...</span>
		}

		let keys = ui.sortedArray

    if (!keys || keys.length == 0) {
      return <span> No items </span>
    }

    let firstIndex = ui.currentPage * ui.page_size
    let lastIndex = Math.min(keys.length, firstIndex + ui.page_size)
    let totalLen = keys.length
    keys = keys.slice(firstIndex, lastIndex)

    return (
      <div className="paginated-table">
        { this.renderPagination(firstIndex, lastIndex, totalLen, this.handlePagination.bind(this)) }
        <ul>
          <li className="header">
            <TitleRow />
          </li>
          {
            keys.map(function (k, i) {
            	return (
            		<li key={k.id} >
            			<Row item={k} isSelected={this.isSelected(k.id)} onClick={(e) => this.props.onClick(k.id)} />
            		</li>
            	)
            }, this)
          }
        </ul>
      </div>
    )
	}

	renderPagination(firstIndex, lastIndex, len, onPagination) {
		let detail = `${firstIndex+1}-${lastIndex} of ${len} items`

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
    return this.props.ui.selectedItem == k
  }


	handlePagination(direction) {
    let { ui, items } = this.props
    let keys = Object.keys(items)
    let firstIndex = ui.currentPage * ui.page_size
    let lastIndex = Math.min(keys.length, firstIndex + ui.page_size)

    // error check just in case!!
    if (!this.canPage(firstIndex, lastIndex, ui.sortedArray.length, direction))
      return 

    this.props.onPagination(direction)
  }

  canPage(firstIndex, lastIndex, len, direction) {
    if (direction == -1 && firstIndex == 0)
      return false

    if (direction == 1 && lastIndex >= len)
      return false

    return true
  }
}