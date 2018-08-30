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
import { getSrcImg } from '../Img/Img'
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

        data.sort(function(a, b) {
            if (a.date_exhausted === null) {
                return Number.MIN_SAFE_INTEGER
            } 
            if (b.date_exhausted === null) {
                return Number.MAX_SAFE_INTEGER
            }
            return b.date_exhausted - a.date_exhausted
        })
        
        const now = new Date()

        const minAxisDate = new Date(now.getTime())
        minAxisDate.setDate(minAxisDate.getDate() - 25)
        const maxAxisDate = new Date(minAxisDate.getTime())
        maxAxisDate.setMonth(maxAxisDate.getMonth() + 4)

        let x = scaleTime()
            .range([0, width])
            .domain([minAxisDate, maxAxisDate])
        let y = scaleBand()
            .range([height, 0])
            .domain(data.map(function(d) { return d.product_type.name; }))
            .padding(0.25);
        
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

        let nowPlusOne = new Date(now.getTime())
        nowPlusOne.setDate(nowPlusOne.getDate() + 1)
        svg.selectAll(".bar")
            .data(data)
            .enter().append("path")
            .attr("d", d => {
                if (!d.date_exhausted)
                    return null
                // we use nowPlusOne instead of now so that there is a little nub sticking out if the resource is exhausted
                const barLength = d.date_exhausted < nowPlusOne ? x(nowPlusOne) - x(now): x(d.date_exhausted) - x(now)
                // border radius is perfectly round when it is one third of the bar width
                const borderRadius = BAR_WIDTH/3
                return rightRoundedRect(x(now), y(d.product_type.name), barLength, y.bandwidth(), borderRadius)
            })
            .attr("class", d => d.date_exhausted < now ? "grayed-out-bar" : "bar")
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
        
        // create gradient for gray part
        let gradient = svg.append('defs')
            .append('linearGradient')
            .attr('id', 'gradient')
            .attr("x2", "0%")
            .attr("x1", "100%")
        gradient.append("stop")
            .attr("offset", "0%")
            .attr("class", "stop-right")
            .attr("stop-opacity", 0.6);
        gradient.append("stop")
            .attr("offset", "100%")
            .attr("class", "stop-left")
            .attr("stop-opacity", 0);
        
        // gray part at the beginning of each bar
        svg.selectAll('rect')
            .data(data).enter()
            .append("rect")
            .attr("width", x(now))
            .attr("height", y.bandwidth())
            .attr("x", 0)
            .attr("y", d => y(d.product_type.name))
            .attr('opacity', d => {
                if (!d.date_exhausted) {
                    return 0.0
                }
                return 1.0
            })
            .style("fill", "url(#gradient)")

        // y axis
        svg.append("g")
            .attr("class", "y axis")
            .attr("transform", "translate(" + x(now) + ", 0)")
            .call(axisLeft(y)
                .tickSizeOuter(0)
            )
        
        // change y axis text color if exhausted material
        svg.selectAll(".y text")
            .data(data)
            .attr('class', d => {
                if (!d.date_exhausted || d.date_exhausted > now) {
                    return 'y-axis-text'
                }
                return 'y-axis-text-danger'
            })
            .text(d => {
                if (!d.date_exhausted || d.date_exhausted > now) {
                    return d.product_type.name
                }
                return "No " + d.product_type.name
            })

        // error icon
        svg.selectAll('.y .axis')
            .data(data).enter()
            .append('svg:image', ':first-child')
            .attr('class', 'error-icon')
            .attr('xlink:href', getSrcImg('error', '.svg')) 
            .attr('width', 14)
            .attr('height', 14)
            .attr('x', 10)
            .attr('y', d => y(d.product_type.name) + 3)
            .attr('opacity', d => {
                if (!d.date_exhausted || d.date_exhausted > now){
                    return 0.0
                }
                return 1.0
            })

        // not enough recent usage data
        svg.selectAll('.y .axis')
            .data(data).enter()
            .append('text')
            .text(d => !d.date_exhausted ? 'Not enough recent usage data' : '')
            .attr('class', 'not-enough-usage-data')
            .attr('x', x(now) + 8)
            .attr('y', d => y(d.product_type.name) + 14)
        
        // Rounded rectancle on its right side
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