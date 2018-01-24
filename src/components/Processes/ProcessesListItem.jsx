import React from 'react'
import ObjectListItem from '../ObjectList/ObjectListItem'
import Icon from '../Card/Icon'
import moment from 'moment'

export default class ProcessesListItem extends React.Component {
	getClassNames() {
		return "process-list-item"
			+ (this.props.isSelected ? " process-selected" : "")
			+ (this.props.header ? " process-list-header" : "")
	}


	render() {
		let { item, onClick } = this.props

		return (
			<ObjectListItem className={this.getClassNames()} onClick={onClick}>

				<div className="code">
					<Icon src="" size="20px" content={item.code}/>
					{item.code}
				</div>

				<div className="name">
					{item.name}
				</div>
				<div className="owner">
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

function ic(str = "abcd") {
	return str.substring(0, str.length - 4)
}