import React from 'react'
import { connect } from 'react-redux'
import * as actions from './InventoryActions'

class Inventory extends React.Component {
	componentDidMount() {
		this.props.dispatch(actions.fetchInitialInventory())
	}

	render() {
		return (
			<div>	
				<button onClick={this.page.bind(this)}>More</button>
				<p>{this.props.ui.more}</p>
				{ 
					this.props.data.map((e, i) => {
						return <span key={i} style={{display: 'block'}}>{e.display}</span>
					})
				}
			</div>
		)
	}	

	page() {
		let { more } = this.props.ui
		if (more) {
			this.props.dispatch(actions.fetchMoreInventory(more))
		} else {
			console.log('nothing more here!')
		}
	}
}