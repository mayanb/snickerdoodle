import React, { Component } from 'react'
import { forceSimulation, forceLink, forceManyBody, forceCenter } from 'd3-force'
import { scaleOrdinal, schemeCategory20 } from 'd3-scale'
import { event } from 'd3-selection'
import { drag } from 'd3-drag'
import { select } from 'd3-selection'

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
      const width = 500
      const height = 500
      var color = scaleOrdinal(schemeCategory20);
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


      var node = select(ref).append('g')
         .attr('class', 'nodes')
         .selectAll('circle')
         .data(graph.nodes)
         .enter().append('circle')
         .attr('r', 5)
         .attr('fill', d => color(d.group))
         .call(drag()
            .on('start', dragstarted)
            .on('drag', dragged)
            .on('end', dragended)
         )


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

         node
            .attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; });
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
      return <svg ref={node => this.node = node}
         width={500} height={500} className="lesmis">
      </svg>
   }
}
export default BarChart