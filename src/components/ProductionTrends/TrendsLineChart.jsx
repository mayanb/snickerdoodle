import React from 'react'
import { findBestBucketSize, getTicks } from '../../utilities/graphutils'
import LineChartTooltip from './LineChartTooltip'
import moment from 'moment'
import './styles/trendslinechart.css'

import {
	scaleTime,
	scaleLinear,
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

const TOOLTIP_WIDTH = 120
const TOOLTIP_HEIGHT = 60

export default class TrendsLineChart extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			hover: null
		}

		this.renderD3 = this.renderD3.bind(this)
	}

	componentDidMount() {
		this.renderD3()
	}

	componentDidUpdate(preProps) {
		if (!(preProps.data === this.props.data))
			this.renderD3()
	}

	renderD3() {
		if (!this.props.data || !this.props.data.length)
			return

		const ref = this.node

		const chartData = convertChartData(this.props.data)

		const margin = {
				top: 20,
				right: 80,
				bottom: 30,
				left: 60
			},
			width = 1000 - margin.left - margin.right,
			height = 300 - margin.top - margin.bottom


		const x = scaleTime()
			.range([0, width])

		const y = scaleLinear()
			.range([height, 0])


		const _line = line()
			.x(d => x(d.date))
			.y(d => y(d.value))

		//Clean up old chart
		select(ref).selectAll("*").remove();

		const svg = select(ref)
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")")

		x.domain(extent(chartData, d => d.date))

		// do some math to find a good scale for this graph
		// so that the line appears kind of in the middle
		let dataMedian = median(chartData, c => c.value)
		let dataMax = max(chartData, c => c.value)
		let maxY = Math.max(dataMedian * 2, dataMax + dataMedian / 4.0)

		// 1. find the best bucket size for this scale
		// 2. make the maxY a multiple of the bucket size
		// 3. find the ticks for this maxY & bucketsize
		let bestBucketSize = findBestBucketSize(maxY)
		maxY = Math.ceil(maxY / bestBucketSize) * bestBucketSize
		let ticks = getTicks(bestBucketSize, maxY)

		y.domain([0, maxY])

		// add the X axis
		svg.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," + height + ")")
			.call(axisBottom(x)
				.ticks(timeMonth)
				.tickFormat(d => moment(d).format("MMM YY"))
			)

		// add the Y axis
		svg.append("g")
			.attr("class", "y axis")
			.call(axisLeft(y).tickValues(ticks))
			.append("text")
			.attr("transform", "rotate(-90)")
			.attr("y", 6)
			.attr("dy", ".71em")
			.style("text-anchor", "end")

		// add the Y axis label
		svg.append("text")
			.attr("class", "y-axis-label")
			.attr("transform", "rotate(-90)")
			.attr("y", 0 - margin.left)
			.attr("x", 0 - (height / 2))
			.attr("dy", "1em")
			.style("text-anchor", "middle")
			.text(this.props.unitLabel);

		// add the X gridlines
		svg.append("g")
			.attr("class", "grid")
			.attr("transform", "translate(0," + height + ")")
			.call(axisBottom(x).ticks(timeMonth).tickFormat("").tickSize(-height))

		// add the Y gridlines
		svg.append("g")
			.attr("class", "grid")
			.call(axisLeft(y).tickValues(ticks).tickSize(-width).tickFormat(""))

		const series = svg.selectAll(".series")
			.data([chartData])
			.enter().append("g")
			.attr("class", "series")

		series.append("path")
			.attr("class", "line")
			.attr("d", _line)

		series.selectAll("circles")
			.data(chartData)
			.enter().append("circle")
			.attr("class", "data-circle")
			.attr("r", 4)
			.attr("cx", d => x(d.date))
			.attr("cy", d => y(d.value))

		const focus = svg.append("g")
			.attr("class", "focus")
			.style("display", "none")

		focus.append("line")
			.attr("class", "x-hover-line hover-line")
			.attr("y1", 0)
			.attr("y2", height)

		let focusCircle = focus.append("circle")
			.attr("class", "data-circle hover-circle")
			.attr("r", 4)
			.attr("cx", 0)
			.attr("cy", 0)

		const updateHover = this.updateHover.bind(this)

		svg.append("rect")
			.attr("class", "overlay")
			.attr("width", width)
			.attr("height", height)
			.on("mouseover", () => focus.style("display", null))
			.on("mouseout", () => {
				focus.style("display", "none");
				updateHover(null)
			})
			.on("mousemove", mousemove)

		function mousemove() {
			const bisectDate = bisector(d => d.date).left

			const x0 = x.invert(mouse(this)[0]),
				i = bisectDate(chartData, x0, 1),
				d0 = chartData[i - 1],
				d1 = chartData[i],
				d = x0 - d0.date > d1.date - x0 ? d1 : d0

			const xValue = x(d.date)
			const yValue = y(d.value)

			focus.attr("transform", "translate(" + xValue + ",0)")
			focusCircle.attr("transform", "translate(0," + yValue + ")")
			focus.select(".x-hover-line").attr("y2", height)

			updateHover(
				{
					x: xValue + margin.left - TOOLTIP_WIDTH / 2,
					y: 0 + margin.top - TOOLTIP_HEIGHT,
					total: d.value,
					period: moment(d.date).format('MMM YY')
				}
			)
		}
	}

	updateHover(hoverData) {
		this.setState({ hover: hoverData })
	}

	render() {
		return (
			<div className="trends-line-chart">
				<svg ref={node => this.node = node} />
				<LineChartTooltip
					x={this.state.hover && this.state.hover.x}
					y={this.state.hover && this.state.hover.y}
					height={TOOLTIP_HEIGHT}
					width={TOOLTIP_WIDTH}
				>
					<div>
						<span className="title">Month: </span>{this.state.hover && this.state.hover.period}
					</div>
					<div>
						<span className="title">Total: </span>{this.state.hover && this.state.hover.total.toLocaleString()}
					</div>
				</LineChartTooltip>
			</div>
		)
	}

}

function convertChartData(data) {
	return data.map(datum => ({
		date: moment(datum.bucket),
		value: datum.total_amount
	}))
}

