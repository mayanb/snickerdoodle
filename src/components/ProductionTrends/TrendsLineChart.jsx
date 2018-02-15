import React from 'react'
import moment from 'moment'
import { findBestBucketSize, getTicks } from '../../utilities/graphutils'
import LineChartTooltip from './LineChartTooltip'
import './styles/trendslinechart.css'

import {
	scaleTime,
	scaleLinear,
	scaleOrdinal,
	schemeCategory10,
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
		if(!this.props.data || !this.props.data.length)
			return

		const ref = this.node

		const chartData = convertChartData(this.props.data)
		const tooltipData = convertTooltipData(chartData)

		const margin = {
				top: 20,
				right: 80,
				bottom: 30,
				left: 50
			},
			width = 900 - margin.left - margin.right,
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

		const color = scaleOrdinal(schemeCategory10)
			.domain(chartData.map(d => d.name))

		x.domain(extent(chartData[0].values, d => d.date))

		// do some math to find a good scale for this graph
		// so that the line appears kind of in the middle
		let dataMedian = median(chartData, c => {
				return median(c.values, v => v.value)
			})
		let dataMax = max(chartData, c => {
				return max(c.values, v => v.value)
			})
		let maxY = Math.min(dataMedian * 2, dataMax + dataMedian/4.0) 

		// 1. find the best bucket size for this scale
		// 2. make the maxY a multiple of the bucket size
		// 3. find the ticks for this maxY & bucketsize
		let bestBucketSize = findBestBucketSize(maxY)
		maxY = Math.ceil(maxY/bestBucketSize) * bestBucketSize
		let ticks = getTicks(bestBucketSize, maxY)

		y.domain([0, maxY])

		const legend = svg.selectAll('g')
			.data(chartData)
			.enter()
			.append('g')
			.attr('class', 'legend')

		legend.append('rect')
			.attr('x', width - 20)
			.attr('y', (d, i) => i * 20)
			.attr('width', 10)
			.attr('height', 10)
			.style('fill', d => color(d.name))

		legend.append('text')
			.attr('x', width - 8)
			.attr('y', (d, i) => (i * 20) + 9)
			.text(d => d.name)

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
			.data(chartData)
			.enter().append("g")
			.attr("class", "series")

		series.append("path")
			.attr("class", "line")
			.attr("d", d => _line(d.values))
			.style("stroke", d => color(d.name))

		series.selectAll("circles")
			.data(d => d.values)
			.enter().append("circle")
			.attr("class", "data-circle")
			.attr("r", 4)
			.attr("cx", d => {let xv = x(d.date); console.log(d); return xv})
			.attr("cy", d => y(d.value))

		series.append("text")
			.datum(d => ({
				name: d.name,
				value: d.values[d.values.length - 1]
			}))
			.attr("transform", d => "translate(" + x(d.value.date) + "," + y(d.value.value) + ")")
			.attr("x", 3)
			.attr("dy", ".35em")
			.text(d => d.name)

		// const mouseG = svg.append("g")
		// 	.attr("class", "mouse-over-effects")

		// mouseG.append("path") // this is the black vertical line to follow mouse
		// 	.attr("class", "mouse-line")
		// 	.style("stroke", "black")
		// 	.style("stroke-width", "1px")
		// 	.style("opaseries", "0")

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
				i = bisectDate(tooltipData, x0, 1),
				d0 = tooltipData[i - 1],
				d1 = tooltipData[i],
				d = x0 - d0.date > d1.date - x0 ? d1 : d0

			const maxValue = max(d.values, (x) => x.value)
			const xValue = x(d.date)
			const yValue = y(maxValue)

			focus.attr("transform", "translate(" + xValue + ",0)")
			focusCircle.attr("transform", "translate(0," + yValue + ")")
			focus.select(".x-hover-line").attr("y2", height)

			updateHover(
				{
					x: xValue + margin.left - TOOLTIP_WIDTH / 2,
					y: 0 + margin.top - TOOLTIP_HEIGHT,
					thisYear: d.values[0].value,
					lastYear: d.values[1].value
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
					lastYear={this.state.hover && this.state.hover.lastYear}
					thisYear={this.state.hover && this.state.hover.thisYear}
					height={TOOLTIP_HEIGHT}
					width={TOOLTIP_WIDTH}
				/>
			</div>
		)
	}

}

function convertChartData(data) {
	const thisYear = {
		name: 'This Year',
		values: data.map(datum => ({
			date: moment(datum.bucket),
			value: datum.total_amount
		}))
	}
	return [thisYear]
}

function convertTooltipData(data) {
	return data[0].values.map(thisYearDatum => {
		//const lastYearDatum = data[1].values.find(d => d.date.unix() === thisYearDatum.date.unix())
		return {
			date: thisYearDatum.date,
			values: [
				{
					name: data[0].name,
					value: thisYearDatum.value
				},
				{
					name: 'Last Year',
					value: 'N/A'
				}
				/**
				{
					name: data[1].name,
					value: lastYearDatum.value
				}
				 */
			]
		}
	})
}
