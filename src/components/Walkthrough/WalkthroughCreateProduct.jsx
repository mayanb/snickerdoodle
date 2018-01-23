import React from 'react'
import { connect } from 'react-redux'
import WalkthroughButton from './WalkthroughButton'
import WalkthroughInput from './WalkthroughInput'
import WalkthroughHint from './WalkthroughHint'
import Card from '../Card/Card'
import * as productActions from '../Products/ProductsActions'
import './styles/walkthroughcreateproduct.css'

export class WalkthroughCreateProduct extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			product: {
				name: '',
				code: ''
			}
		}
	}

	render() {
		return (
			<div className="walkthrough-create-product">
				<Card>
					<div className="walkthrough-container">
						<div className="walkthrough-header">Now let's make your first product.</div>
						<div className="subtitle">
						A product is any type of object you want to track in your factory. Final goods, intermediate outputs, and
							raw materials are all fair game!
						</div>
						<WalkthroughHint>
							Examples: Sugar, Milk, White Chocolate 50g box, Small green t-shirt
						</WalkthroughHint>
						<WalkthroughInput placeholder="Type your product name"
						                  onChange={(v) => this.setState({ product: { ...this.state.product, name: v }})}></WalkthroughInput>
						<WalkthroughInput 
							placeholder="Choose a 1-3 letter abbreviation"
						  onChange={(v) => this.setState({ product: { ...this.state.product, code: v }})} 
						  help="An 1-3 letter abbreviation helps your team quickly read off a label"
						/>
					<WalkthroughButton title="I made my first product" onClick={() => this.handleSubmit()}></WalkthroughButton>
					</div>
				</Card>
			</div>
		)
	}

	handleSubmit() {
		this.props.dispatch(productActions.postCreateProduct(this.state.product))
			.then(() => this.props.onCompleteStage())
	}
}

const mapStateToProps = (state/*, props*/) => {
	return {
	}
}

export default connect(mapStateToProps)(WalkthroughCreateProduct)
