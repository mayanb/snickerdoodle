import React from 'react'
import TrendsLineChart from './TrendsLineChart'
import './styles/productiontrends.css'

export default class ProductionTrends extends React.Component {
	render() {
		const mockData = [
			{
				name: 'This Year',
				values: [
					{
						date: '20170801',
						value: 63.4,
					},
					{
						date: '20170901',
						value: 58.0,
					},
					{
						date: '20171001',
						value: 53.3,
					},
					{
						date: '20171101',
						value: 55.7,
					},
					{
						date: '20171201',
						value: 64.2,
					},
					{
						date: '20180101',
						value: 57.9,
					}
				]
			},
			{
				name: 'Last Year',
				values: [
					{
						date: '20170801',
						value: 62.7
					},
					{
						date: '20170901',
						value: 59.9
					},
					{
						date: '20171001',
						value: 59.1
					},
					{
						date: '20171101',
						value: 58.8
					},
					{
						date: '20171201',
						value: 58.7
					},
					{
						date: '20180101',
						value: 56.7
					},
				]
			}
		]

		return (
			<div className="production-trends">
				<TrendsLineChart data={mockData} />
			</div>
		)
	}

}