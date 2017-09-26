import React from 'react'
import ButtonDropdown from '../Card/ButtonDropdown'
import Button from '../Card/Button'


export default class ProcessesCardMenu extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			isMenuOpen: false, 
		}

		this.handleToggleMenu = this.handleToggleMenu.bind(this)
		this.handleArchive = this.handleArchive.bind(this)
		this.handleEdit = this.handleEdit.bind(this)
	}

	render() {
		return (
			<ButtonDropdown 
				secondary 
				menu 
				expanded={this.state.isMenuOpen}
				onToggleDropdown={this.handleToggleMenu}
				button={<i className="material-icons">more_horiz</i>}
			>
				<div style={{minWidth: "100px"}}>
					<Button secondary onClick={this.handleEdit}>
						<i className="material-icons">edit</i>
						<span>Edit</span>
					</Button>
					<Button secondary onClick={this.handleArchive}>
						<i className="material-icons">delete_forever</i>
						<span>Archive</span>
					</Button>
				</div>
			</ButtonDropdown>
		)
	}

	handleToggleMenu() {
		this.setState({isMenuOpen: !this.state.isMenuOpen})
	}

	handleArchive() {
		this.handleToggleMenu()
		this.props.onArchive()
	}

	handleEdit() {
		this.handleToggleMenu()
		this.props.onEdit()
	}

}