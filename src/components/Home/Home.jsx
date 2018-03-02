import React from 'react'
import Goals from '../Goals/Goals'
import Card from '../Card/Card'
import ProductionTrends from '../ProductionTrends/ProductionTrends'
import NewFeatures from '../NewFeatures/NewFeatures'
import './styles/home.css'
import Updates from './Updates'


export default class Home extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			tabs: ['Production trends', 'Goals'],
			activeTab: 0,
		}

		this.handleTab = this.handleTab.bind(this)
	}

	handleTab(i) {
		this.setState({activeTab: i})
	}

	renderGoals() {
		return (
			<div style={{maxWidth: "400px", minWidth: "400px", marginLeft: "36px"}}>
				<BigHeader>How's it going?</BigHeader>
				<div style={{display: 'flex', maxWidth: "800px", minWidth: "800px"}}>
					<Card className="goals-card">
						<Goals/>
					</Card>
					<Updates />
				</div>
			</div>
		)
	}

	render() {
		return (
			<div>
				<NewFeatures />
				<div className="dashboard">
					<Title>Dashboard</Title>
					<Tabs {...this.state} onTab={this.handleTab}/>
					{
						this.state.activeTab===0 ? <ProductionTrends /> : this.renderGoals()
					}
				</div>		
			</div>
		)
	}
}

function BigHeader(props) {
	return (
		<span style={{fontSize: "20px", lineHeight: "32px", color: '#445562', paddingTop: '5px', paddingBottom: '11px', display: 'block'}}>
			{props.children}
		</span>
	)
}

function Tabs({tabs, activeTab, onTab}) {
	return (
		<div className="home-tabs">
			{
				tabs.map((t, i) => {
					return <Tab title={t} key={i} active={activeTab===i} onTab={() => onTab(i)} />
				})
			}
		</div>
	)
}

function Tab({title, active, onTab}) {
	return (
		<div className={`home-tab ${active && 'active'}`} onClick={onTab}>
			<span>{title}</span>
		</div>
	)
}



function Title(props) {
	return (
		<div className="home-title">{props.children}</div>
	)
}

