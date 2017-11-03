import React, { Component } from 'react'
import { forceSimulation, forceLink, forceManyBody, forceCenter } from 'd3-force'
import { scaleOrdinal, schemeCategory20 } from 'd3-scale'
import { event } from 'd3-selection'
import { drag } from 'd3-drag'
import { select } from 'd3-selection'
import * as actions from './BarChartActions'
import { connect } from 'react-redux'
import BarChart from './BarChart'

class BCWrapper extends Component {
  constructor(props) {
    super(props)
    this.state = {
      graphs: {},
    }
  }

  componentDidMount() {
    console.log("hi")
    this.props.dispatch(actions.getProcessCooccurrence(1))
  }

  render() {
    let {graphs} = this.props
    console.log(graphs)

    if (this.props.graphs.isFetchingData) {
      return <span>Loading...</span>
    }
    return <BarChart data={this.props.graphs.data} size={[500,500]} />
  }
}

const mapStateToProps = (state/*, props*/) => {
  return {
    graphs: state.graphs,
  }
}

const connectedBCWrapper = connect(mapStateToProps)(BCWrapper)

export default connectedBCWrapper