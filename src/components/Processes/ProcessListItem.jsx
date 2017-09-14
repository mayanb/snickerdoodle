import React from 'react'


export default class ProcessListItem extends React.Component {
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
					{item.code}
				</div>
				<div className={"products-list-name"}>
					{item.name}
				</div>
				<div className={"products-list-unit"}>
					{item.unit}
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