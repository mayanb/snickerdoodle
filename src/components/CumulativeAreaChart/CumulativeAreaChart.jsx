import React from 'react'
import moment from 'moment'
import { findBestBucketSize, getTicks } from '../../utilities/graphutils'
import LineChartTooltip from '../ProductionTrends/LineChartTooltip'
import './styles/cumulativeareachart.css'

import {
	scaleTime,
	scaleLinear,
	scaleOrdinal,
	schemeCategory10,
	axisBottom,
	axisLeft,
	area,
	select,
	extent,
	max,
	median,
	sum,
	mouse,
	bisector,
	timeMonth
} from 'd3'

const TOOLTIP_WIDTH = 120
const TOOLTIP_HEIGHT = 60

export default class CumulativeAreaChart extends React.Component {

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

		const chartData = convertChartData(this.props.data, this.props.name)
		const tooltipData = convertTooltipData(chartData)

		const margin = {
				top: 20,
				right: 80,
				bottom: 30,
				left: 50
			},
			width = 400 - margin.left - margin.right,
			height = 200 - margin.top - margin.bottom


		const x = scaleTime()
			.range([0, width])

		const y = scaleLinear()
			.range([height, 0])


		const _area = area()
			.x(d => x(d.date))
			.y0(height)
			.y1(d => y(d.value))

		//Clean up old chart
		select(ref).selectAll("*").remove();

		const svg = select(ref)
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")")

		x.domain(extent(chartData[0].values, d => d.date))

		// do some math to find a good scale for this graph
		// so that the line appears kind of in the middle
		let dataMedian = median(chartData, c => {
			return median(c.values, v => v.value)
		})
		let dataMax = max(chartData, c => {
			return max(c.values, v => v.value)
		})
		let maxY = Math.max(dataMedian * 2, dataMax + dataMedian / 4.0)

		// 1. find the best bucket size for this scale
		// 2. make the maxY a multiple of the bucket size
		// 3. find the ticks for this maxY & bucketsize
		console.log('maxY', maxY)
		let bestBucketSize = findBestBucketSize(maxY)
		console.log('bestBucketSize', bestBucketSize)
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
			.attr("class", "area")
			.attr("d", d => _area(d.values))

		series.selectAll("circles")
			.data(d => d.values)
			.enter().append("circle")
			.attr("class", "data-circle")
			.attr("r", 2)
			.attr("cx", d => {
				let xv = x(d.date);
				return xv
			})
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
			<div className="cumulative-area-chart">
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

function convertChartData(data, name) {
	const totalAmounts = data.map(d => d.total_amount)
	const thisYear = {
		name: name,
		values: data.map((datum, i) => ({
			date: moment(datum.bucket),
			value: sum(totalAmounts.slice(0, i+1))
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
