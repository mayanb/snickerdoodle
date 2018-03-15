import {
	RECENT_MONTHS,
	MONTH_TO_DATE,
	WEEK_TO_DATE
} from './components/ProductionTrends/ProductionTrendsActions'

export let stateDefault = {
	data: [],
	ui: {
		isFetchingData: false,
		isCreatingItem: false,
		isDeletingItem: false,
		isEditingItem: false,
		currentPage: 0,
		page_size: 20,
		selectedItem: null,
		error: null
	}
}

export const productionTrendsStateDefault = {
	[RECENT_MONTHS]: {
		data: [],
		ui: {
			isFetchingData: false,
			error: null
		}
	},
	[MONTH_TO_DATE]: {
		data: [],
		ui: {
			isFetchingData: false,
			error: null
		}
	},
	[WEEK_TO_DATE]: {
		data: [],
		ui: {
			isFetchingData: false,
			error: null
		}
	}
}

export const modalStateDefault = {
	modalType: null,
	modalProps: {}
}

export const inventoriesStateDefault = {
	data: {},
	ui: {
		isFetchingData: false,
		isFetchingItemsData: false
	}
}
