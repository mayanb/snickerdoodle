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
	timeDay
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
			width = 500 - margin.left - margin.right,
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

		//const start = this.props.name === 'This Week' ? moment().startOf('week').toDate() : moment().startOf('month').toDate()
		//x.domain([start, moment().toDate()])
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
		let bestBucketSize = findBestBucketSize(maxY)
		maxY = Math.ceil(maxY / bestBucketSize) * bestBucketSize
		let ticks = getTicks(bestBucketSize, maxY)

		y.domain([0, maxY])

		let tickLabelFrequency = 1
		if(this.props.name === 'This Month') {
			tickLabelFrequency = Math.floor(moment().date() / 10) + 1
		}
		// add the X axis
		svg.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," + height + ")")
			.call(axisBottom(x)
				.ticks(timeDay.every(tickLabelFrequency))
				.tickFormat(d => moment(d).format("M/D"))
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
			.call(axisBottom(x).ticks(timeDay).tickFormat("").tickSize(-height))

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
					total: d.values[0].value,
					period: moment(d.date).format('M/D')
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
					period={this.state.hover && this.state.hover.period}
					total={this.state.hover && this.state.hover.total}
					height={TOOLTIP_HEIGHT}
					width={TOOLTIP_WIDTH}
				/>
			</div>
		)
	}

}

function convertChartData(data, name) {
	const totalAmounts = data.map(d => d.total_amount)
	const total = {
		name: name,
		values: data.map((datum, i) => ({
			date: moment(datum.bucket),
			value: sum(totalAmounts.slice(0, i+1))
		}))
	}
	return [total]
}

function convertTooltipData(data) {
	return data[0].values.map(totalDatum => {
		//const periodDatum = data[1].values.find(d => d.date.unix() === totalDatum.date.unix())
		return {
			date: totalDatum.date,
			values: [
				{
					name: data[0].name,
					value: totalDatum.value
				},
				{
					name: 'Last Year',
					value: 'N/A'
				}
				/**
				 {
					 name: data[1].name,
					 value: periodDatum.value
				 }
				 */
			]
		}
	})
}
