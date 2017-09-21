import React from 'react'
import ApplicationLayoutStable from './ApplicationLayout.jsx'
import { Provider } from 'react-redux'

export default class Application extends React.Component {
  render () {
    return (
      <Provider store={ this.props.store }>
        <ApplicationLayoutStable />
      </Provider>
    )
  }
}