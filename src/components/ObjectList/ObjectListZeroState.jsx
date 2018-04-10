import React from 'react'
import pluralize from 'pluralize'
import './styles/objectlistzerostate.css'

export default class ZeroState extends React.Component {
	render() {
		let { type } = this.props
		let pl = pluralize(type, 2)
		return (
		  <div className="objectlist-zerostate">
		   	<span className="objectlist-zerostate-header">You have no&nbsp;{pl}&nbsp;yet!</span>
		   	<span>Add&nbsp;{pl}&nbsp;to your factory by clicking the <span className='create-btn'>Create {type}</span> button above.</span>
		   	<a href="https://polymer.helpscoutdocs.com" target="_blank" rel="noopener noreferrer">
		   		<i className="material-icons">library_books</i>View Help Center
		   	</a>
		  </div>
		)
	}
}