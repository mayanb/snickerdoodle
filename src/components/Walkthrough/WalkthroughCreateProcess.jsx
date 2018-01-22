import React from 'react'
import WalkthroughButton from './WalkthroughButton'
import WalkthroughInput from './WalkthroughInput'
import Card from '../Card/Card'
import WalkthroughHint from './WalkthroughHint'
import * as processActions from '../Processes/ProcessesActions.jsx'
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
						<WalkthroughHint>A process is a single step at your factory that you want to log information
							for.</WalkthroughHint>
						<WalkthroughInput placeholder="Type your process name"
						                  onChange={(v) => this.setState({ process: {...this.state.process, name: v }})}></WalkthroughInput>
						<WalkthroughInput placeholder="Type your process code"
						                  onChange={(v) => this.setState({ process: { ...this.state.process, code: v }})}></WalkthroughInput>
						<WalkthroughButton title="Got it" onClick={() => this.props.onSubmit(this.state.process)}></WalkthroughButton>
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
					type: 'TEXT'
				},
				{
					name: 'Start time',
					type: 'TIME'
				}
			]
		}
	}

	render () {
		const attributes = this.state.attributes.map((attribute, index) => {
			return (
				<div className="attribute-row" key={index}>
					<WalkthroughInput value={attribute.name} onChange={() => ''}></WalkthroughInput>
					<EditSelect onChange={() => ''}></EditSelect>
					<div className="deleteAttribute"><Img src="delete"/></div>
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
						                   onClick={() => this.props.onSubmit(this.state.attributes)}></WalkthroughButton>
					</div>
				</Card>
			</div>
		)
	}
}

const mapStateToProps = (state/*, props*/) => {
	return {}
}

export default connect(mapStateToProps)(WalkthroughCreateProcessAndAttributes)

