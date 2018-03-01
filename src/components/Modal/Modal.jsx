import React from 'react'
import { connect } from 'react-redux'
import TaskDialog from '../TaskDialog/TaskDialog'

const MODAL_COMPONENTS = {
	'TASK_DIALOG': TaskDialog
}

const Modal = ({ modalType, modalProps }) => {
	if (!modalType) {
		return null
	}

	const SpecificModal = MODAL_COMPONENTS[modalType]
	return <SpecificModal {...modalProps} />
}

export default connect(
	state => state.modal
)(Modal)