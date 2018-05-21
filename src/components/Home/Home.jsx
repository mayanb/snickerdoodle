import React from 'react'
import { connect } from 'react-redux'
import Goals from '../Goals/Goals'
import Card from '../Card/Card'
import ApplicationSectionHeader from '../Application/ApplicationSectionHeader'
import ProductionTrends from '../ProductionTrends/ProductionTrends'
import * as processesActions from '../Processes/ProcessesActions.jsx'
import * as productsActions from '../Products/ProductsActions.jsx'
import './styles/home.css'
import { shouldShowChecklist } from '../../utilities/userutils'
import Checklist from '../NewUserChecklist/NewUserChecklist'


class Home extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			tabs: ['Production trends', 'Goals'],
			activeTab: 0,
		}

		this.handleTab = this.handleTab.bind(this)
		this.handleFilterChange = this.handleFilterChange.bind(this)
		this.setDefaultFilters = this.setDefaultFilters.bind(this)
	}

	componentDidMount() {
		Promise.all([
			this.props.dispatch(processesActions.fetchProcesses()),
			this.props.dispatch(productsActions.fetchProducts())
		]).then(this.setDefaultFilters)
	}

	setDefaultFilters() {
		const foil = this.props.processes.find(p => p.name === 'Foil')
		const defaultProcessType = foil ? foil.id : this.props.processes[0].id
		const { selectedProcess, selectedProducts } = this.getFilters()
		this.handleFilterChange(
			selectedProcess ? selectedProcess : defaultProcessType,
			selectedProducts
		)
	}

	handleFilterChange(selectedProcess, selectedProducts) {
		const qs = new URLSearchParams(this.props.location.search)
		qs.set('selectedProcess', selectedProcess)
		qs.set('selectedProducts', selectedProducts.join(',') )
		this.props.history.push({search: qs.toString() })
	}

	getFilters() {
		const qs = new URLSearchParams(this.props.location.search)
		return {
			selectedProcess: qs.get('selectedProcess'),
			selectedProducts: qs.get('selectedProducts') ? qs.get('selectedProducts').split(',') : []
		}
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
				</div>
			</div>
		)
	}

	render() {
		const { selectedProcess, selectedProducts } = this.getFilters()
		console.log({selectedProcess, selectedProducts})
		const { processes, products } = this.props

		if (shouldShowChecklist(this.props.team.toLowerCase())) {
			return <Checklist />
		}

		return (
			<div>
				<div className="dashboard">
					<ApplicationSectionHeader>Dashboard</ApplicationSectionHeader>
					<Tabs {...this.state} onTab={this.handleTab}/>
					{
						this.state.activeTab===0 ?
							<ProductionTrends
								processes={processes}
								products={products}
								selectedProcess={selectedProcess}
								selectedProducts={selectedProducts}
								onFilterChanage={this.handleFilterChange}
							/> :
							this.renderGoals()
					}
				</div>		
			</div>
		)
	}
}

const mapStateToProps = (state/*, props*/) => {
	let { data, ui } = state.users
	let team = data[ui.activeUser].user.team_name
	const isFetchingData = state.processes.ui.isFetchingData || state.products.ui.isFetchingData
  return {
    team: team,
	  processes: state.processes.data,
	  products: state.products.data,
	  isFetchingData: isFetchingData
  }
}
export default connect(mapStateToProps)(Home)

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
