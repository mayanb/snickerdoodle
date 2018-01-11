import React from 'react'
import Icon from '../Card/Icon'

export default class ProductsListItem extends React.Component {
	getClassNames() {
		return "products-list-item" 
			+ (this.props.header?" products-list-header":"")
	}

	render() {
		let { item, onClick } = this.props
		item.owner = item.owner || 'N/A'
		item.dateCreated = item.dateCreated || 'N/A'

		return (
			<div className={this.getClassNames()} onClick={onClick}>

				<div className={"code"}>
					<Icon src="" size="20px" content={item.code}/>
					{item.code}
				</div>
				<div className={"name"}>
					{item.name}
				</div>
				<div className={"owner"}>
					<Icon src="" size="20px" content={item.owner}/>
					{item.owner}
				</div>
				<div className={"date"}>
					{item.dateCreated}
				</div>
				
			</div>
		)
	}

}

