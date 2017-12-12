import React from 'react'
import {connect} from 'react-redux'
import * as actions from './ActivityActions'
import ActivitySummaryHeader from './ActivitySummaryHeader'
import ActivitySummaryRow from './ActivitySummaryRow'
import ActivitySummaryFollow from './ActivitySummaryFollow'

class ActivitySummary extends React.Component {

	componentDidMount() {

	}

	render() {
		let {activity} = this.props
		return (
			<div>
				<ActivitySummaryHeader />
				{
					activity.map(function (act, i) {
						return <ActivitySummaryRow key={i} {...act} />
					})
				}
				<ActivitySummaryFollow />
			</div>
		)
	}

}

const mapStateToProps = (state, props) => {
	let act = {process_id: 1, process_name: 'Roast', process_code: 'R', product_name: 'Camino Verde 2', product_code: 'CV2', runs: 4, output: '200.00', process_unit: 'kg'}
  return {
  	activity: [act, act, act]
  }
}

export default connect(mapStateToProps)(ActivitySummary)