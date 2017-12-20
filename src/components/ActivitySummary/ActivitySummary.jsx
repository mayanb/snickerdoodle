import React from 'react'
import {connect} from 'react-redux'
import * as actions from './ActivityActions'
import ActivitySummaryHeader from './ActivitySummaryHeader'
import ActivitySummaryRow from './ActivitySummaryRow'
import ActivitySummaryFollow from './ActivitySummaryFollow'

class ActivitySummary extends React.Component {

	componentDidMount() {
		this.props.dispatch(actions.fetchActivity())
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
  return {
  	activity: state.activity.data
  }
}

export default connect(mapStateToProps)(ActivitySummary)