import React from 'react'
import {connect} from 'react-redux'
import Card from '../Card/Card'

function Updates(props) {
	let {data, ui} = props.users
	let team = data[ui.activeUser].user.team_name
	if (team === 'alabama' || team === 'valencia') {
		return <div style={{flex: 1}} />
	}

	return (
		<div style={{flex: 1}}>
			<Card className="updates">
				<span>Download the app onto iPhone/iPod at <a target="_blank" rel="noopener noreferrer" href="https://goo.gl/qSmJE6">goo.gl/qSmJE6</a> </span>
			</Card>

			<Card className="updates">
				<span>Read the <a target="_blank" rel="noopener noreferrer" href="https://polymer-publications.gitbooks.io/getting-started/content/">Getting Started guide</a> to learn how to use Polymer and onboard your team</span>
			</Card>

			<Card className="updates">
				<span><a target="_blank" rel="noopener noreferrer" href="https://polymer-publications.gitbooks.io/getting-started/content/printing-brother-printer.html">Print your first QR codes</a></span>
			</Card>

		</div>
	)
}

const mapStateToProps = (state/*, props*/) => {
  return {
    users: state.users
  }
}

export default connect(mapStateToProps)(Updates)