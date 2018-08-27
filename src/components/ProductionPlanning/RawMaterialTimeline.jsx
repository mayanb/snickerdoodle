import React from 'react'
import Spinner from 'react-spinkit'
import {
    scaleLinear,
    scaleTime,
    scaleBand,
	axisBottom,
	axisLeft,
	select,
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
        const { data } = this.props

        if (!data || !data.length)
            return

        const ref = this.node
        const BAR_WIDTH = 30
        
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
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var x = scaleTime().range([0, width]);
        var y = scaleBand().range([height, 0]);

        data.sort(function(a, b) { return b.date_exhausted - a.date_exhausted; });
        
        const now = new Date()

        const minAxisDate = new Date(now.getTime())
        minAxisDate.setMonth(minAxisDate.getMonth() - 1)
        const maxAxisDate = new Date(minAxisDate.getTime())
        maxAxisDate.setMonth(maxAxisDate.getMonth() + 4)

        x.domain([minAxisDate, maxAxisDate]);
        y.domain(data.map(function(d) { return d.product_type.name; })).padding(0.25);
        
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(axisBottom(x)
                .ticks(4)
                .tickFormat(timeFormat("%b"))
                .tickPadding(8)
                .tickSizeInner([-height])
                .tickSizeOuter(0)
            )

        svg.selectAll(".bar")
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
                // i.e. 2 months in the future the bar will be at its lightest opacity
                const maxDate = new Date(now.getTime())
                maxDate.setMonth(maxDate.getMonth() + 2)

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
        
        svg.append("g")
            .attr("class", "y axis")
            .attr("transform", "translate(" + x(now) + ", 0)")
            .call(axisLeft(y)
                .tickSizeOuter(0)
            )

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
        const { isFetchingData } = this.props
		return (
            <div className='raw-materials-timeline'>
                { isFetchingData ? 
                    <Spinner name="circle" /> : 
                    <svg ref={node => this.node = node} /> 
                }
            </div>
        )
	}
}