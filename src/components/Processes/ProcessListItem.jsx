import React from 'react'
import ReactImageFallback from 'react-image-fallback'


export default class ProcessListItem extends React.Component {
	getClassNames() {
		return "products-list-item" 
			+ (this.props.isSelected?" products-selected":"")
			+ (this.props.header?" products-list-header":"")
	}



	render() {
		let { isSelected, item, onClick } = this.props
		let errorImg = `${process.env.PUBLIC_URL}/public/img/default@3x.png`
		let symbol = <ReactImageFallback src={process.env.PUBLIC_URL + `/img/${item.icon}@3x.png`} fallbackImage={errorImg}/>

		return (
			<div className={this.getClassNames()} onClick={onClick}>

				<div className={"products-list-select-circle"}>
					{symbol}
				</div>

				<div className={"products-list-code"}>
					{item.code}
				</div>
				<div className={"products-list-name"}>
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