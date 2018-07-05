import React from 'react'
import Button from '../Button/Button'
import './styles/taskqr.css'
import Img from '../Img/Img'

import TaskFileDropzone from './TaskFileDropzone'
import TaskInputsAndOutputs from './TaskInputsAndOutputs'

export default class TaskQR extends React.Component {

	componentDidMount() {
		if (this.props.qrCode) {
			new window.QRCode(this.taskQRCode, this.props.qrCode)
		}
	}

	render() {
		const { name, onDelete, onDropFiles, task } = this.props
		return (
			<div className="task-qr">
				<div className="title">
					<Img src="qrcode@2x" />
					Scan to Open in App
				</div>
				<div className="qr-code-container">
					<div id="task-qr-code" ref={ref => this.taskQRCode = ref}></div>
				</div>
				<div className="delete-task">
					<Button wide type="red" onClick={onDelete}>Delete {name}</Button>
				</div>
				<TaskFileDropzone onDropFiles={onDropFiles} task={task} />
				<TaskInputsAndOutputs />
			</div>
		)
	}
}
