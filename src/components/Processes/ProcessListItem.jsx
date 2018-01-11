import React from 'react'
import ReactImageFallback from 'react-image-fallback'
import './styles/processlistitem.css'

export default class ProcessListItem extends React.Component {
	getClassNames() {
		return "process-list-item"
			+ (this.props.isSelected?" process-selected":"")
			+ (this.props.header?" process-list-header":"")
	}



	render() {
		let { isSelected, item, onClick } = this.props
		let errorImg = `/img/default@3x.png`
		let symbol = <ReactImageFallback src={`/img/${ic(item.icon)}@3x.png`} fallbackImage={errorImg}/>

		return (
			<div className={this.getClassNames()} onClick={onClick}>

				<div className={"process-list-select-circle"}>
					{symbol}
				</div>

				<div className={"process-list-code"}>
					{item.code}
				</div>
				<div className={"process-list-name"}>
					{item.name}
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

function ic(str = "abcd") {
	return str.substring(0, str.length-4)
}