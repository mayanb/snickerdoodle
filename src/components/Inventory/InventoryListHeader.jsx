import React from 'react'
import InventoryListItem from './InventoryListItem'

export default class InventoryListHeader extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      fixed: false,
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll.bind(this))
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll(e) { 
    if (this && this.state) {
      if (e.srcElement.scrollingElement.scrollTop > 176) {
        this.setState({fixed: true})
      } else {
        this.setState({fixed: false})
      }
    }
  }


  render() {
    return (
      <div className={this.state.fixed?"fixed":""}>
        <InventoryListItem i={"no"} header={true} output_desc={"PRODUCT TYPE"} count={"COUNT"} unit={"UNIT"} />
      </div>
    )
  }
}