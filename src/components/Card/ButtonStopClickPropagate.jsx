import React from 'react'
import './styles/button.css'

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
		let {secondary, link, onClick, ...rest} = this.props
		let className=secondary?" secondary ":""
		className = className + (link?" link ":"")
		return (
			<button {...rest} className={className} onClick={this.clickFn}>{rest.children}</button>
		)
	}
}