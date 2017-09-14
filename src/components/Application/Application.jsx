import React from 'react'
import ApplicationLayout from './ApplicationLayout.jsx'
import { Provider } from 'react-redux'

export default class Application extends React.Component {
  render () {
    return (
      <Provider store={ this.props.store }>
        <ApplicationLayout />
      </Provider>
    )
  }
}