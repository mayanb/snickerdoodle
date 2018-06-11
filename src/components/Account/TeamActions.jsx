import api from '../WaffleconeAPI/api'

export const REQUEST_UPDATE_SETTING = "REQUEST_UPDATE_SETTING"
export const REQUEST_UPDATE_SETTING_SUCCESS = "REQUEST_UPDATE_SETTING_SUCCESS"
export const REQUEST_UPDATE_SETTING_FAILURE = "REQUEST_UPDATE_SETTING_FAILURE"

export function updateLabelType(id, key, value) {
	return function (dispatch) {
		dispatch(requestUpdateUserSetting(key))

		api.patch(`/ics/teams/${id}/`)
			.send({[key]: value})
			.end(function (err, res) {
				if (err || !res.ok) {
					console.log(err)
					dispatch(updateUserSettingFailure())
				} else {
					dispatch(updateUserSettingSuccess(key, value))
				}
			})
	}
}

// Note on storage: since we don't store a team object, we update the user object on success

function requestUpdateUserSetting(key, value) {
	return {
		type: REQUEST_UPDATE_SETTING,
		key: key,
	}
}

function updateUserSettingSuccess(key, value) {
	return {
		type: REQUEST_UPDATE_SETTING_SUCCESS,
		key: key,
		value: value,
	}
}

function updateUserSettingFailure(key, value) {
	return {
		type: REQUEST_UPDATE_SETTING_FAILURE,
		key: key,
		value: value,
	}
}