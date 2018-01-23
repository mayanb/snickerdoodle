import React from 'react'
import {connect} from 'react-redux'
import ProductPage from '../ProductPage/ProductPage'
import Walkthrough from '../Walkthrough/Walkthrough'

export class Home extends React.Component {
	render() {
		return (
			this.props.user.walkthrough >= 0 ? <Walkthrough></Walkthrough> : <ProductPage></ProductPage>
		)
	}
}

const mapStateToProps = (state/*, props*/) => {
	let {data, ui} = state.users
	if (ui.activeUser && ui.activeUser >= 0 && data[ui.activeUser]) {
		return { user: data[ui.activeUser].user }
	}
	return { user: {}}
}

export default connect(mapStateToProps)(Home)
