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
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     graphs: {},
  //   }
  // }

  componentDidMount() {
    console.log("hi")
    this.props.dispatch(actions.getProcessCooccurrence(1))
  }

  render() {
    let graphs = this.props.graphs
    console.log(graphs)

    if (graphs.ui.isFetchingData) {
      return <span>Loading...</span>
    }
    if (!graphs.data || graphs.data.length == 0) {
      return <span>Nothing to show here</span>
    }

    return( 
      <div className='App'>
        <div className='App-header'>
          <h2>d3ia dashboard</h2>
        </div>
        <div>
          <BarChart data={graphs.data} size={[500,500]} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state/*, props*/) => {
  console.log(state)
  return {
    graphs: state.graphs,
  }
}

const connectedBCWrapper = connect(mapStateToProps)(BCWrapper)

export default connectedBCWrapper