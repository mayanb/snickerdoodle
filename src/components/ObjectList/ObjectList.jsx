import React from 'react'
import './styles/objectlist.css'
import Spinner from 'react-spinkit'

export default class ObjectList extends React.Component {
	render() {
		let classes = 'object-list'
		let {isFetchingData, className, ...rest} = this.props
		if (this.props.className) {
			classes += ` ${className}`
		}
		return (
			<div {...rest} className={classes}>
				{isFetchingData ?
					<Spinner name="circle" /> :
					this.props.children
				}
			</div>
		)
	}
}


