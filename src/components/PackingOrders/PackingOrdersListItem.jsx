import React from 'react'


export default class PackingOrdersListItem extends React.Component {
	getClassNames() {
		return "products-list-item" 
			+ (this.props.isSelected?" products-selected":"")
			+ (this.props.header?" products-list-header":"")
	}

	render() {
		let { isSelected, item, onClick } = this.props
		return (
			<div className={this.getClassNames()} onClick={onClick}>

				<div className={"products-list-select-circle"}>
					<SelectCircle isSelected={isSelected} />
				</div>

				<div className={"products-list-code"}>
					{item.created_at}
				</div>
				<div className={"products-list-name"}>
					{item.ordered_by_name}
				</div>
				<div className={"products-list-unit"}>
					{item.status}
				</div>
				
			</div>
		)
	}

}

function SelectCircle(props) {
	return (
		<div className={"select-circle" + (props.isSelected?" selected":"")}></div>
	)
}