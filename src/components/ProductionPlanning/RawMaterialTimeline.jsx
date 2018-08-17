import React from 'react'

import {
    scaleLinear,
    scaleTime,
    scaleBand,
	axisBottom,
	axisLeft,
	select,
    min,
    event,
    timeFormat,
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
        const { data } = this.props
        const BAR_WIDTH = 30
        const ref = this.node

        if (data) {
            /* REMOVE THIS */
            // data.push({ 
            //     "date_exhausted": new Date('Mon Sept 10 2018 20:38:15 GMT-0800'),
		    //     "product_type": { "name": "Milk" }
            // })
            // data.push({ 
            //     "date_exhausted": new Date('Mon Oct 25 2018 20:38:15 GMT-0800'),
		    //     "product_type": { "name": "Raw Tumaco Colombia" }
            // })
            // data.push({ 
            //     "date_exhausted": new Date('Mon Oct 30 2018 20:38:15 GMT-0800'),
		    //     "product_type": { "name": "Sugar" }
            // })
            /***************/
            const margin = {
                top: 0,
                right: 0,
                bottom: 20,
                left: 0
            }
            const width = this.props.width - margin.left - margin.right
            const height = (data.length * BAR_WIDTH)
            const svg = select(ref)
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
            
            var tooltip = select("body").append("div").attr("class", "toolTip");
        
            var x = scaleTime().range([0, width]);
            var y = scaleBand().range([height, 0]);
            var g = svg.append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        
            data.sort(function(a, b) { return b.date_exhausted - a.date_exhausted; });
            
            const now = new Date()

            const minAxisDate = new Date(now.getTime())
            minAxisDate.setMonth(minAxisDate.getMonth() - 1)
            const maxAxisDate = new Date(minAxisDate.getTime())
            maxAxisDate.setMonth(maxAxisDate.getMonth() + 4)

            x.domain([minAxisDate, maxAxisDate]);
            y.domain(data.map(function(d) { return d.product_type.name; })).padding(0.25);
            
            g.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(axisBottom(x)
                    .ticks(4)
                    .tickFormat(timeFormat("%b"))
                    .tickPadding(8)
                    .tickSizeInner([-height])
                    .tickSizeOuter(0)
                )

            g.selectAll(".bar")
                .data(data)
                .enter().append("path")
                .attr("d", d => {
                    const barLength = d.date_exhausted < now ? x(now) : x(d.date_exhausted)
                    // border radius is perfectly round when it is one third of the bar width
                    const borderRadius = BAR_WIDTH/3
                    return rightRoundedRect(0, y(d.product_type.name), barLength, y.bandwidth(), borderRadius)
                })
                .attr("class", "bar")
                // changes bar opacity based on when the raw material will be exhausted
                .style("opacity", d => {
                    // Minimum opacity will be at maxDate 
                    // i.e. 4 months in the future the bar will be at its lightest opacity
                    const maxDate = new Date(now.getTime())
                    maxDate.setMonth(maxDate.getMonth() + 4)

                    // creates scale for assigning opacity
                    const MIN_OPACITY = 0.2
                    const opacityScale = scaleLinear().domain([now, maxDate]).range([1, MIN_OPACITY])
                    let opacity = opacityScale(d.date_exhausted)

                    // Makes sure that opacity is greater than MIN_OPACITY and less than 1.0
                    if (opacity > 1.0) {
                        opacity = 1.0
                    } else if (opacity < MIN_OPACITY) {
                        opacity = MIN_OPACITY
                    }
                    return opacity
                })
                .on("mousemove", function(d){
                    tooltip
                    .style("left", event.pageX - 50 + "px")
                    .style("top", event.pageY - 70 + "px")
                    .style("display", "inline-block")
                    .html((d.area) + "<br>" + "£" + (d.date_exhausted));
                })
                .on("mouseout", function(d){ tooltip.style("display", "none");});
            
            g.append("g")
                .attr("class", "y axis")
                .attr("transform", "translate(" + x(now) + ", 0)")
                .call(axisLeft(y)
                    .tickSizeOuter(0)
                )
        };

        // Rounded rectancle on right side
        function rightRoundedRect(x, y, width, height, radius) {
            return "M" + x + "," + y
                 + "h" + (width - radius)
                 + "a" + radius + "," + radius + " 0 0 1 " + radius + "," + radius
                 + "v" + (height - 2 * radius)
                 + "a" + radius + "," + radius + " 0 0 1 " + -radius + "," + radius
                 + "h" + (radius - width)
                 + "z";
        }
    }

	render() {
        const { data } = this.props
		return (
            <div className='raw-materials-timeline'>
                <h1>Raw Materials Timeline</h1>
                { data && data.map((rm, i) => {
                    return (
                        <div key={i}>
                            {`${rm.process_type.code}-${rm.product_type.code}      ${rm.date_exhausted}`}
                        </div>
                    )
			    }) }
                { data && data.length > 0 && <svg ref={node => this.node = node} />}
            </div>
        )
	}
}