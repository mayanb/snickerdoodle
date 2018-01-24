import React from 'react'
import Icon from '../Card/Icon'
import moment from 'moment'
import ObjectListItem from '../ObjectList/ObjectListItem'

export default class ProductsListItem extends React.Component {
	getClassNames() {
		return "products-list-item" 
			+ (this.props.header?" products-list-header":"")
	}

	render() {
		let { item, onClick } = this.props
		item.created_at = item.created_at || 'N/A' //Some products might not have a created_at value

		return (
			<ObjectListItem className={this.getClassNames()} onClick={onClick}>

				<div className={"code"}>
					<Icon src="" size="20px" content={item.code}/>
					{item.code}
				</div>
				<div className={"name"}>
					{item.name}
				</div>
				<div className={"owner"}>
					<Icon src="" size="20px" content={item.username}/>
					{item.username}
				</div>
				<div className={"date"}>
					{moment(item.created_at).format("MMMM DD, YYYY")}
				</div>
				
			</ObjectListItem>
		)
	}

}

