import React from 'react'
import { connect } from 'react-redux'
import * as goalActions from '../Goals/GoalsActions'
import './styles/pinbutton.css'
import { checkEqual } from '../../utilities/arrayutils'
import api from '../WaffleconeAPI/api.jsx'

class PinButton extends React.Component {
	constructor(props) {
		super(props)

		this.handleCreatePin = this.handleCreatePin.bind(this)
		this.handleDeletePin = this.handleDeletePin.bind(this)
	}

	activePinIndex() {
		const { selectedProcess, selectedProducts, pins } = this.props
		return pins.findIndex(pin => {
			const processMatch = String(pin.process_type) === selectedProcess
			const productMatch = (selectedProducts.length === 0 && pin.all_product_types) ||
				(checkEqual(selectedProducts, pin.product_code.map(p => String(p.id))))
			return processMatch && productMatch
		})
	}


	render() {
		const isActive = this.activePinIndex() !== -1

		return (
			<div className="pin-button">
				{!isActive && <button onClick={this.handleCreatePin}>
						Pin These Graphs
					</button>
				}
				{isActive && <button className="unpin" onClick={this.handleDeletePin}>
					Unpin These Graphs
				</button>
				}
			</div>
		)
	}

	handleCreatePin() {
		const { selectedProcess, selectedProducts } = this.props
		const user = api.get_active_user().user
		return this.props.dispatch(goalActions.postCreatePin({
			userprofile: user.profile_id,
			process_type: selectedProcess,
			input_products: selectedProducts.length ? selectedProducts.join(',') : 'ALL',
		}))
	}

	handleDeletePin() {
		const i = this.activePinIndex()
		return this.props.dispatch(goalActions.postDeletePin(this.props.pins[i], i))
	}
}

const mapStateToProps = (state/*, props*/) => {
	return {
		pins: state.pins.data
	}
}

export default connect(mapStateToProps)(PinButton)

