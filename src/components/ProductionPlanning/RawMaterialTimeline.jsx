import React from 'react'

import {
	scaleTime,
    scaleLinear,
    scaleBand,
	axisBottom,
	axisLeft,
	line,
	select,
	extent,
	max,
	median,
	mouse,
	bisector,
	timeMonth
} from 'd3'
import './styles/rawmaterialtimeline.css'

export class RawMaterialTimeline extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
            hover: null
        }
    }
    
    componentDidMount() {
		this.renderTimeline()
    }

    componentDidUpdate(preProps) {
		if (!(preProps.data === this.props.data)) {
            this.renderTimeline()
        }
	}
    
    renderTimeline() {
        console.log('RawMaterialTimeline this.props', this.props)
        const ref = this.node
        const svg = select("svg"),
            margin = {top: 20, right: 20, bottom: 30, left: 80},
            width = +svg.attr("width") - margin.left - margin.right,
            height = +svg.attr("height") - margin.top - margin.bottom;

        var tooltip = select("body").append("div").attr("class", "toolTip");

        var x = scaleLinear().range([0, width]);
        var y = scaleBand().range([height, 0]);
        
        var g = svg.append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    }

	render() {
		return (
            <div className='raw-materials-timeline'>
                <h1>Raw Materials Timeline</h1>
                { this.props.data && this.props.data.map((rm, i) => {
                    return (
                        <div key={i}>
                            {`${rm.process_type.code}-${rm.product_type.code}      ${rm.date_exhausted}`}
                        </div>
                    )
			    }) }
                <svg ref={node => this.node = node} />
            </div>
        )
	}
}