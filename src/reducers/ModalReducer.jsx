import { modalStateDefault } from '../states'

export const SHOW_MODAL_TYPE = 'SHOW_MODAL_TYPE'
export const HIDE_MODAL_TYPE = 'HIDE_MODAL_TYPE'

export function _modal(state, action) {
	switch (action.type) {
		case SHOW_MODAL_TYPE:
			return {
				modalType: action.modalType,
				modalProps: action.modalProps
			}
		case HIDE_MODAL_TYPE:
			return modalStateDefault
		default:
			return state
	}
}

