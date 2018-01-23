import React from 'react'
import WalkthroughButton from './WalkthroughButton'
import WalkthroughInput from './WalkthroughInput'
import Card from '../Card/Card'
import WalkthroughHint from './WalkthroughHint'
import * as processActions from '../Processes/ProcessesActions'
import * as processAttributeActions from '../ProcessAttribute/ProcessAttributeActions'
import { connect } from 'react-redux'
import {EditSelect} from '../ProcessAttribute/ProcessAttributeField'
import './styles/walkthroughcreateprocess.css'
import Img from '../Img/Img'

export class WalkthroughCreateProcessAndAttributes extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			process: {},
			attributes: [],
			pageNumber: 0
		}
	}

	// fetch products on load
	componentDidMount() {
		this.props.dispatch(processActions.fetchProcesses())
	}

	render() {
		switch(this.state.pageNumber) {
			case 0:
				return (
					<WalkthroughCreateProcess onSubmit={(process) => this.handleSubmitProcess(process)}></WalkthroughCreateProcess>
				)
			case 1:
				return (
					<WalkthroughCreateAttributes process={this.state.process}
					                             onSubmit={(attributes) => this.handleSubmitAttributes(attributes)}>
					</WalkthroughCreateAttributes>
				)
		}
	}

	handleSubmitProcess(process) {
		this.setState({process: process, pageNumber: 1 })
	}

	handleSubmitAttributes(attributes) {
		this.props.dispatch(processActions.postCreateProcess(this.state.process, this.props.onCompleteStage))
			.then((res) => {
				const processTypeId = res.item.id
				const processTypeIndex = this.props.processes.data.findIndex((e, i, a) => e.id === processTypeId)
				return Promise.all(attributes.map((attribute) => {
					attribute.process_type = processTypeId;
					return this.props.dispatch(processAttributeActions.saveAttribute(processTypeIndex, attribute))
				}))
			})
			.then(() => this.props.onCompleteStage())
	}
}

class WalkthroughCreateProcess extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			process: {
				name: '',
				code: ''
			}
		}
	}

	render() {
		return (
			<div className="walkthrough-create-process">
				<Card>
					<div className="walkthrough-container">
						<div className="walkthrough-header">Let's make your first process</div>
						<div className="subtitle">
						A process is a single step at your factory that you want to log information
							for.
						</div>
						<WalkthroughInput 
							placeholder="Type your process name"
						  onChange={(v) => this.setState({ process: {...this.state.process, name: v }})} 
						/>
						<WalkthroughInput 
							placeholder="Choose an abbreviation"
						  onChange={(v) => this.setState({ process: { ...this.state.process, code: v }})} 
						/>
						<WalkthroughHint>A 1-3 letter abbreviation helps your team read the process on a label quickly.</WalkthroughHint>
						<WalkthroughButton title="Continue" onClick={() => this.props.onSubmit(this.state.process)}></WalkthroughButton>
					</div>
				</Card>
			</div>
		)
	}
}

class WalkthroughCreateAttributes extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			attributes: [
				{
					name: 'Operator',
					datatype: 'TEXT'
				},
				{
					name: 'Start time',
					datatype: 'TIME'
				},
				{
					name: '',
					datatype: 'TEXT'
				},
				{
					name: '',
					datatype: 'TEXT'
				}
			]
		}
	}

	render () {
		const attributes = this.state.attributes.map((attribute, index) => {
			const placeholder = attribute.name === '' ? 'Add another...' : null
			return (
				<div className="attribute-row" key={index}>
					<WalkthroughInput value={attribute.name} onChange={(v) => this.handleNameChange(v, index)} placeholder={placeholder}></WalkthroughInput>
					{attribute.name ? <EditSelect onChange={(n, v) => this.handleTypeChange(v, index)} value={attribute.datatype}></EditSelect> : <div></div>}
				</div>
			)
		})

		return (
			<div className="walkthrough-create-attributes">
				<Card>
					<div className="walkthrough-container">
						<div className="walkthrough-header">Now, let's tell your team what to log for this process.</div>
						<div className="subtitle">Whenever {this.props.process.name} happens, I need to know:</div>
						{attributes}
						<WalkthroughButton title="I added log fields"
						                   onClick={() => this.handleSubmit()}></WalkthroughButton>
					</div>
				</Card>
			</div>
		)
	}

	handleNameChange(value, index) {
		const newAttributes = this.state.attributes.slice()
		newAttributes[index] = {...newAttributes[index], name: value}
		this.setState({attributes: newAttributes})
	}

	handleTypeChange(value, index) {
		const newAttributes = this.state.attributes.slice()
		newAttributes[index] = {...newAttributes[index], datatype: value}
		this.setState({attributes: newAttributes})
	}

	handleSubmit() {
		this.props.onSubmit(this.state.attributes.filter((attribute) => attribute.name))
	}
}

const mapStateToProps = (state/*, props*/) => {
	return {
		processes: state.processes
	}
}

export default connect(mapStateToProps)(WalkthroughCreateProcessAndAttributes)

