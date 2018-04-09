
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DragSource, DropTarget } from 'react-dnd'
import ItemTypes from './ItemTypes'

const cardSource = {
	canDrag(props) {
		return props.canDrag
	},

	beginDrag(props) {
		return {
			id: props.id,
			originalIndex: props.findCard(props.id).index,
		}
	},

	endDrag(props, monitor) {
		const { id: droppedId, originalIndex } = monitor.getItem()
		const didDrop = monitor.didDrop()

		if (!didDrop) {
			props.moveCard(droppedId, originalIndex)
		} else {
			props.dropCard()
		}
	},
}

const cardTarget = {
	canDrop() {
		return false
	},

	hover(props, monitor) {
		const { id: draggedId } = monitor.getItem()
		const { id: overId } = props

		if (draggedId !== overId) {
			const { index: overIndex } = props.findCard(overId)
			props.moveCard(draggedId, overIndex)
		}
	},
}


class Card extends Component {
	static propTypes = {
		connectDragSource: PropTypes.func.isRequired,
		connectDropTarget: PropTypes.func.isRequired,
		isDragging: PropTypes.bool.isRequired,
		id: PropTypes.any.isRequired,
		moveCard: PropTypes.func.isRequired,
		findCard: PropTypes.func.isRequired,
	}

	render() {
		const {
			renderProps,
			connectDragSource,
			connectDropTarget,
		} = this.props
		const component = connectDropTarget(<div><this.props.renderer {...renderProps} /></div>)

		//Hack for Firefox bug related to input elements - https://github.com/react-dnd/react-dnd/issues/260
		return this.props.canDrag ? connectDragSource(component) : component
	}
}

let m = DropTarget(ItemTypes.CARD, cardTarget, connect => ({
	connectDropTarget: connect.dropTarget(),
}))(Card)

export default DragSource(ItemTypes.CARD, cardSource, (connect, monitor) => ({
	connectDragSource: connect.dragSource(),
	isDragging: monitor.isDragging(),
}))(m)
