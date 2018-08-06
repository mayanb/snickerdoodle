import React, { Component } from 'react'
import PropTypes from 'prop-types'
import update from 'immutability-helper'
import { DropTarget, DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Card from './Card'
import ItemTypes from './ItemTypes'

const style = {
}

const cardTarget = {
	drop() {},
}

class Container extends Component {
	constructor(props) {
		super(props)
		this.state = {cards : update(props.cards, {})}
	}

	static propTypes = {
		connectDropTarget: PropTypes.func.isRequired,
	}

	componentWillReceiveProps(np) {
		this.setState({cards: update(np.cards, {}) })
	}

	moveCard(id, atIndex) {
		let { card, index } = this.findCard(id)
		card = update(card, { isMoving: {$set: true}})
		this.setState(
			update(this.state, {
				cards: {
					$splice: [[index, 1], [atIndex, 0, card]],
				},
			}),
		)
	}

	finishMovingCard() {
		const cardIndex = this.state.cards.findIndex(c => c.isMoving)
		console.log(cardIndex)
		this.props.finishMovingCard(this.state.cards[cardIndex].id, cardIndex)
	}

	findCard(id) {
		const { cards } = this.state
		const card = cards.filter(c => c && c.id === id)[0]

		return {
			card,
			index: cards.indexOf(card),
		}
	}

	/* MUFU IS A MAD DOG */

	render() {
		const { connectDropTarget } = this.props
		const { cards } = this.state

		return connectDropTarget(
			<div style={style}>
				{cards.map((card, i) => (
					<Card
						key={card.id}
						id={card.id}
						text={card.name}
						renderer={this.props.renderer}
						renderProps={update(card, {$merge: {index: i}})}
						moveCard={this.moveCard.bind(this)}
						canDrag={this.props.canEdit}
						findCard={this.findCard.bind(this)}
						dropCard={this.finishMovingCard.bind(this)}
					/>
				))}
			</div>,
		)
	}
}


let m = DropTarget(ItemTypes.CARD, cardTarget, connect => ({
	connectDropTarget: connect.dropTarget(),
}))(Container);
export default DragDropContext(HTML5Backend)(m)