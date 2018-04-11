import React from 'react'
import Button from './Button'

export default class ButtonStopClickPropagate extends React.Component {
	constructor(props) {
		super(props)
		this.clickFn = this.clickFn.bind(this)
	}

	clickFn(e) {
		this.props.onClick()
		if (!e) e = window.event;
    	e.cancelBubble = true;
   		if (e.stopPropagation) e.stopPropagation();
	}


	render() {
		let {onClick, children, ...rest} = this.props
		return (
			<Button {...rest} onClick={this.clickFn}>{children}</Button>
		)
	}
}