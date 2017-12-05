import React, { Component } from 'react'
import { forceSimulation, forceLink, forceManyBody, forceCenter } from 'd3-force'
import { scaleOrdinal, schemeCategory20 } from 'd3-scale'
import { event } from 'd3-selection'
import { drag } from 'd3-drag'
import { select } from 'd3-selection'
import * as actions from './BarChartActions'
import { connect } from 'react-redux'


// class BCWrapper extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       graphs: {},
//     }
//   }

//   componentDidMount() {
//     console.log("hi")
//     this.props.dispatch(actions.getProcessCooccurrence(1))
//   }

//   render() {
//     let {graphs} = this.props
//     console.log(graphs)

//     if (this.props.graphs.isFetchingData) {
//       return <span>Loading...</span>
//     }
//     return <BarChart data={this.props.graphs.data} size={[500,500]} />
//   }
// }

class BarChart extends Component {
   constructor(props){
      super(props)
      this.createBarChart = this.createBarChart.bind(this)
   }

   componentDidMount() {
     this.createBarChart()
   }

   componentDidUpdate() {
      this.createBarChart()
   }
   createBarChart() {
      const ref = this.node
      const graph = this.props.data
      console.log(graph)
      const width = 800
      const height = 500
      var color = scaleOrdinal(schemeCategory20);

      select(ref).append("svg:defs").selectAll("marker")
        .data(["end"])      // Different link/path types can be defined here
        .enter().append("svg:marker")    // This section adds in the arrows
          .attr("id", String)
          .attr("viewBox", "0 -5 10 10")
          .attr("refX", 15)
          .attr("refY", -1.5)
          .attr("markerWidth", 6)
          .attr("markerHeight", 6)
          .attr("orient", "auto")
        .append("svg:path")
          .attr("d", "M0,-5L10,0L0,5");

      var simulation = forceSimulation()
         .force("link", forceLink().id(function(d) { return d.id; }))
         .force("charge", forceManyBody())
         .force("center", forceCenter(width / 2, height / 2));

      var link = select(ref).append('g')
         .attr('class', 'links')
         .selectAll('line')
         .data(graph.links)
         .enter().append('line')
          .attr('stroke-width', d => Math.sqrt(d.value))
          .attr("marker-end", "url(#end)");


      var node = select(ref).append('g')
         .attr('class', 'nodes')
         .selectAll('circle')
         .data(graph.nodes)
         .enter().append('g')
         // .attr('fill', d => color(d.group))
         .call(drag()
            .on('start', dragstarted)
            .on('drag', dragged)
            .on('end', dragended)
         )

      node.append('circle')
        .attr('r', 5)

      node.append('text')
        .attr('dx', 12)
        .attr('dy', '0.35em')
        .text(d => d.name)



      simulation
         .nodes(graph.nodes)
         .on('tick', ticked)

      simulation.force('link')
         .links(graph.links)

      function ticked() {
         link
            .attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });

         node.attr('transform', d => "translate(" + d.x + "," + d.y + ")");
      }

      function dragstarted(d) {
        if (!event.active) 
         simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }

      function dragged(d) {
        d.fx = event.x;
        d.fy = event.y;
      }

      function dragended(d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }
   }

   render() {

    // if (this.props.graph.ui.isFetchingData) {
    //   return <span>Loading...</span>
    // }


      return <svg ref={node => this.node = node}
         width={800} height={500} className="lesmis">
      </svg>
   }
}
export default BarChart



