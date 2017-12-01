import React, { Component } from 'react'
import { forceSimulation, forceLink, forceManyBody, forceCenter } from 'd3-force'
import { scaleOrdinal, schemeCategory20, scaleBand, scaleLinear } from 'd3-scale'
import { event } from 'd3-selection'
import { drag } from 'd3-drag'
import { select } from 'd3-selection'
import {csvParse} from 'd3-dsv'
import {axisBottom, axisLeft} from 'd3-axis'
import * as actions from './BarChartActions'
import { connect } from 'react-redux'
import {data} from './roast_data.jsx'

const BUCKET_SIZE = 300

class RoastChart extends Component {
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
      var color = scaleOrdinal(schemeCategory20);

      var svg = select(this.node),
        margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom;

      var x = scaleBand().rangeRound([0, width]).padding(0.1),
          y = scaleLinear().rangeRound([height, 0]);

      var g = svg.append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


      let buckets = {}
      let maxX = 0;
      csvParse(data, function (d) {
        if (+d.seconds < 300) {
          return 
        }
        let b = Math.floor(+d.seconds / BUCKET_SIZE)

        if (b > maxX) {
          maxX = b
        }

        if (buckets[b]) {
          buckets[b] = buckets[b] + 1
        } else {
          buckets[b] = 1
        }
      })

      let maxY = 0
      let buckets_array = []
      for(var i=0; i<100;i+=1) {
        let freq = buckets[i] ? buckets[i] : 0
        if (freq > maxY) {
          maxY = freq
        }
        buckets_array.push({bucket: (i), frequency: freq})
      }

      let domain = buckets_array.map(d => d.bucket)
      domain.push(maxX + 1)
      x.domain(domain);
      y.domain([0, maxY]);

      g.append("g")
          .attr("class", "axis axis--x")
          .attr("transform", "translate(0," + height + ")")
          .call(axisBottom(x));

      g.append("g")
          .attr("class", "axis axis--y")
          .call(axisLeft(y).ticks(10))
        .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", "0.71em")
          .attr("text-anchor", "end")
          .text("Frequency");

      g.selectAll(".bar")
        .data(buckets_array)
        .enter().append("rect")
          .attr("class", "bar")
          .attr("x", function(d) { return x(d.bucket); })
          .attr("y", function(d) { return y(d.frequency); })
          .attr("width", x.bandwidth())
          .attr("height", function(d) { return height - y(d.frequency); });
   }

   render() {

    // if (this.props.graph.ui.isFetchingData) {
    //   return <span>Loading...</span>
    // }


      return <svg ref={node => this.node = node}
         width={4000} height={500} className="lesmis">
      </svg>
   }
}
export default RoastChart



