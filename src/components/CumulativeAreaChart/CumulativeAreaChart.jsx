import React from 'react'
import moment from 'moment'
import { findBestBucketSize, getTicks } from '../../utilities/graphutils'
import { shortNumber } from '../../utilities/stringutils'
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
		if (!(preProps.data === this.props.data) || !(preProps.goal === this.props.goal))
			this.renderD3()
	}

	renderD3() {
		if (!this.props.data || !this.props.data.length)
			return


		const ref = this.node

		const chartData = convertChartData(this.props.data, this.props.name)

		const margin = {
				top: 20,
				right: 48,
				bottom: 30,
				left: 48
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

		x.domain(extent(chartData, d => d.date))

		// do some math to find a good scale for this graph
		// so that the line appears kind of in the middle
		let dataMedian = median(chartData, d => d.value)
		let dataMax = max(chartData, d => d.value)
		if(this.props.goal) {
			dataMax = Math.max(dataMax, this.props.goal)
		}
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
				.tickFormat((d, i) => {

					// if it's the last index it's actually that extra tick. so no need to label
					// it (8 ticks for 7 labels, since the labels are in between the ticks)
					if (i === 7) {
						return ''
					}
					const format = this.props.labelDays ? 'ddd' : 'M/D'
					return moment(d).format(format)
				})
			)
			.selectAll('.x.axis text')
      .attr('transform', 'translate(' + width/(chartData.length*2) + ',0)');

		// add the Y axis
		svg.append("g")
			.attr("class", "y axis")
			.call(axisLeft(y)
				.tickValues(ticks)
				.tickFormat(shortNumber)

			)
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
			.data([chartData])
			.enter().append("g")
			.attr("class", "series")

		series.append("path")
			.attr("class", "area")
			.attr("d", _area)

		if(this.props.goal) {
			const yValue = y(this.props.goal)
			const x1Value = x(x.domain()[0])
			const x2Value = x(x.domain()[1])
			svg.append("line")
				.attr("class", "goal-line")
				.attr("x1", x1Value)
				.attr("y1", yValue)
				.attr("x2", x2Value)
				.attr("y2", yValue)

			const label = svg.append("g")
				.attr("class", "goal-label")
				.attr("transform", `translate(${x2Value - 6}, ${yValue - 10})`)

			label.append("rect")
				.attr("rx", 10)
				.attr("ry", 10)
				.attr("width", 50)
				.attr("height", 20)

			label.append("text")
				.text("GOAL")
				.attr("dx", 10)
				.attr("dy", 14)
		}

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
				currentDate = chartData[i - 1],
				nextDate = chartData[i]

			const xValue = x(nextDate.date)

			focus.attr("transform", "translate(" + xValue + ",0)")
			focus.select(".x-hover-line").attr("y2", height)

			updateHover(
				{
					x: xValue + margin.left - TOOLTIP_WIDTH / 2,
					y: 0 + margin.top - TOOLTIP_HEIGHT,
					value: currentDate.value,
					change: currentDate.change,
					period: moment(currentDate.date).format('ddd, MMM D')
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
		const { hover } = this.state
		const hoverDate = parseInt(hover.period.slice(-2), 10)
		const currDate = moment(Date.now()).date() + 1
		// Hide tooltip for future dates (useful because we've appended an extra date for visual purposes)
		if (hoverDate >= currDate) {
			return
		}
		const dailyTotal = hover.change !== null ? hover.change.toLocaleString() : 'N/A'
		const cumulativeTotal = hover.value !== null ? hover.value.toLocaleString() : 'N/A'
		return (
			<LineChartTooltip
				x={hover.x}
				y={hover.y}
				height={TOOLTIP_HEIGHT}
				width={TOOLTIP_WIDTH}
			>
				<div>
					<span className="title">Day: </span>{hover.period}
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
	let isFirstNull = true
	let d = data.map((datum, i) => {
		const value = datum.total_amount !== null ? sum(totalAmounts.slice(0, i + 1)) : null
		// We add one extra non-null datum at the end which duplicates the final non-null datum,
		// producing a more legible flat line extending from final true data point
		if (value == null && isFirstNull) {
			const prevValue = sum(totalAmounts.slice(0, i))
			const prevDatum = data[i - 1]
			isFirstNull = false
			return {
				date: moment(datum.bucket),
				value: prevValue,
				change: prevDatum.total_amount
			}
		} else {
			return {
				date: moment(datum.bucket),
				value: value,
				change: datum.total_amount
			}
		}
	})

	// we need to add another tick because we are actually labelling between ticks
	// so for 7 labels we need 8 ticks
	let lastDay = d[d.length - 1]
	let d2 = { date: moment(lastDay.date).add(1, 'day'), value: null, change: null }
	d.push(d2)
	return d
}

