import React from 'react'

const LINKS = ['Activity', 'Inventory', 'Products', 'Print']



export default class Navbar extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div className="navbar">
				{ this.renderNavBrand() }
				{ this.renderList() }
			</div>
		)
	}

	renderNavBrand() {
		return (
			<div>
				<Logo />
			</div>
		)
	}

	renderList() {
		return (
			<ul>
			{
				LINKS.map(function (link, i) {
					return <li key={i}>{link}</li>
				})
			}
			</ul>
		)
	}
}




function Logo() {
	return (
	 	<div className='logo'></div>
	)
}