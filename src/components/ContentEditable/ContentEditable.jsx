import React from 'react'

export default class ContentEditable extends React.Component {
	constructor(props) {
		super(props)

		this.emitChange = this.emitChange.bind(this)
	}

    render(){
        return (
        	<div id="contenteditable" ref={div => this.node = div}
            onInput={this.emitChange} 
            onBlur={this.emitChange}
            onKeyDown={this.emitChange}
            contentEditable
            dangerouslySetInnerHTML={{__html: this.props.html}} />
           )
    }

    shouldComponentUpdate(nextProps) {
    	return nextProps.html !== this.node.innerHTML
    }

    componentDidUpdate() {
    	 if ( this.props.html !== this.node.innerHTML ) {
           this.node.innerHTML = this.props.html;
        }
    }

    emitChange(e){
        var html = this.node.innerHTML;

        if (e.keyCode === 13) {
            e.preventDefault(); // Let's stop this event.
            e.stopPropagation(); // Really this time.
        }

        if (this.props.onChange) {
            this.props.onChange({
            		type: e.type,
            		key: e.key,
            		keyCode: e.keyCode,
                target: {
                    value: html
                }
            });
        }
        this.lastHtml = html;
    }
}