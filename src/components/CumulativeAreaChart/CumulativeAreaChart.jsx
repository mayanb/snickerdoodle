import React from 'react'
import moment from 'moment'
import { findBestBucketSize, getTicks } from '../../utilities/graphutils'
import LineChartTooltip from '../ProductionTrends/LineChartTooltip'
import './styles/cumulativeareachart.css'

import {
	scaleTime,
	scaleLinear,
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
	timeDay,
	curveStepAfter,
} from 'd3'

const TOOLTIP_WIDTH = 188
const TOOLTIP_HEIGHT = 84

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

		const margin = {
				top: 20,
				right: 20,
				bottom: 30,
				left: 40
			},
			width = this.props.width - margin.left - margin.right,
			height = this.props.height - margin.top - margin.bottom


		const x = scaleTime()
			.range([0, width])

		const y = scaleLinear()
			.range([height, 0])


		const _area = area()
			.curve(curveStepAfter)
			.x(d => x(d.date))
			.y0(height)
			.y1(d => y(d.value))
			.defined(d => d.value !== null)

		//Clean up old chart
		select(ref).selectAll("*").remove();

		const svg = select(ref)
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")")

		//const start = this.props.name === 'This Week' ? moment().startOf('week').toDate() : moment().startOf('month').toDate()
		//x.domain([start, moment().toDate()])
		x.domain(extent(chartData, d => d.date))

		// do some math to find a good scale for this graph
		// so that the line appears kind of in the middle
		let dataMedian = median(chartData, d => d.value)
		let dataMax = max(chartData, d => d.value)
		let maxY = Math.max(dataMedian * 2, dataMax + dataMedian / 4.0)

		// 1. find the best bucket size for this scale
		// 2. make the maxY a multiple of the bucket size
		// 3. find the ticks for this maxY & bucketsize
		let bestBucketSize = findBestBucketSize(maxY)
		maxY = Math.ceil(maxY / bestBucketSize) * bestBucketSize
		let ticks = getTicks(bestBucketSize, maxY)

		y.domain([0, maxY])

		const tickLabelFrequency = Math.floor(chartData.length / 10) + 1

		// add the X axis
		svg.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," + height + ")")
			.call(axisBottom(x)
				.ticks(timeDay.every(tickLabelFrequency))
				.tickFormat(d => {
					const format = this.props.labelDays ? 'ddd' : 'M/D'
					return moment(d).format(format)
				})
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
		// svg.append("text")
		// 	.attr("class", "y-axis-label")
		// 	.attr("transform", "rotate(-90)")
		// 	.attr("y", 0 - margin.left)
		// 	.attr("x", 0 - (height / 2))
		// 	.attr("dy", "1em")
		// 	.style("text-anchor", "middle")
		// 	.text(this.props.unitLabel);

		// add the X gridlines
		svg.append("g")
			.attr("class", "grid")
			.attr("transform", "translate(0," + height + ")")
			.call(axisBottom(x).ticks(timeDay).tickFormat("").tickSize(-height))

		// add the Y gridlines
		svg.append("g")
			.attr("class", "grid")
			.call(axisLeft(y).tickValues(ticks).tickSize(-width).tickFormat(""))

		const series = svg.selectAll(".series")
			.data([chartData])
			.enter().append("g")
			.attr("class", "series")

		series.append("path")
			.attr("class", "area")
			.attr("d", _area)

		const focus = svg.append("g")
			.attr("class", "focus")
			.style("display", "none")

		focus.append("line")
			.attr("class", "x-hover-line hover-line")
			.attr("y1", 0)
			.attr("y2", height)

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

			focus.attr("transform", "translate(" + xValue + ",0)")
			focus.select(".x-hover-line").attr("y2", height)

			updateHover(
				{
					x: xValue + margin.left - TOOLTIP_WIDTH / 2,
					y: 0 + margin.top - TOOLTIP_HEIGHT,
					value: d.value,
					change: d.change,
					period: moment(d.date).format('MMM D')
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
				{this.state.hover ? this.renderTooltip() : null}
			</div>
		)
	}

	renderTooltip() {
		const dailyTotal = this.state.hover.change !== null ? this.state.hover.change.toLocaleString() : 'N/A'
		const cumulativeTotal = this.state.hover.value !== null ? this.state.hover.value.toLocaleString() : 'N/A'
		return (
			<LineChartTooltip
				x={this.state.hover.x}
				y={this.state.hover.y}
				height={TOOLTIP_HEIGHT}
				width={TOOLTIP_WIDTH}
			>
				<div>
					<span className="title">Day: </span>{this.state.hover.period}
				</div>
				<div>
					<span className="title">Daily total: </span>{dailyTotal}
				</div>
				<div>
						<span
							className="title">Cumulative total: </span>{cumulativeTotal}
				</div>
			</LineChartTooltip>
		)
	}

}

function convertChartData(data) {
	const totalAmounts = data.map(d => d.total_amount)
	return data.map((datum, i) => {
		const value = datum.total_amount !== null ? sum(totalAmounts.slice(0, i + 1)) : null
		return {
			date: moment(datum.bucket),
			value: value,
			change: datum.total_amount
		}
	})
}

