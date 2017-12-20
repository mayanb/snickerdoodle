import React from 'react'
import Dialog from '../Card/Dialog'
import Button from '../Card/Button'
import DialogHeader from '../Dialog/DialogHeader'
import DialogFooter from '../Dialog/DialogFooter'

let editor_wrapper_style = { display: "flex", marginBottom: "16px"}
let span_style = { display: "block", flex: 3, lineHeight: "28px" }
let input_style = { flex: 5 }
let input_input_style = {width: "100%"}
let footer_style = {display: 'flex', justifyContent: 'flex-end'}

export default function AccountDetailsEdit(props) {
	let display = props.keyDisplay.toLowerCase()
	return (
		<Dialog onToggle={props.onCancel}>
			<DialogHeader>{`Change ${display}`}</DialogHeader>
			<div style={editor_wrapper_style}>
				<span style={span_style}>{`New ${display}`}</span>
				<div style={input_style}>
					<input style={input_input_style} placeholder="john@smith.com" value={props.initialValue} />
				</div>
			</div>
			<DialogFooter>
				<div style={footer_style}>
					<Button secondary onClick={props.onCancel}>Cancel</Button>
					<Button>Save</Button>
				</div>
			</DialogFooter>
		</Dialog>
	)
}