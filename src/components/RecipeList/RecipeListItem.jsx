import React from 'react'
import { formatAmount } from '../../utilities/stringutils';
import './styles/product-recipe-list-item.css'
import ReactImageFallback from "react-image-fallback"

export default function RecipeList(props) {
	console.log(props)
	const stage = props.product_type.name
	const ingredients = props.ingredients.length
	const { process_type } = props
	const recipeYield = formatAmount(process_type.default_amount, process_type.unit)
	const icon = process_type.icon
	return (
		<div className="process-attr-wrapper ">
			<div className='process-attribute'>
				<RecipeField className="list-item-stage">
					<RenderIconOrImage img={icon}/>
					<span>{stage}</span>
				</RecipeField>
				<RecipeField className="list-item-ingredients">{ingredients}</RecipeField>
				<RecipeField className="list-item-recipe-yield"> {recipeYield}</RecipeField>
			</div>
		</div>
	)
}

function RecipeField({children, className}) {
	return <span className={`recipe-item-field ${className}`}>{children}</span>
}

function RenderIconOrImage(props) {
	var symbol = false
	if (props.img) {
		let errorImg = `${process.env.PUBLIC_URL}/img/default@3x.png`
		symbol = <ReactImageFallback src={process.env.PUBLIC_URL + `/img/${props.img}@3x.png`} fallbackImage={errorImg}/>
	} else if (props.icon) {
		symbol = <span><i className="material-icons arrow">{props.icon}</i></span>
	}
	return symbol
}