import { combineReducers } from 'redux'
import { actionTypes } from '../actions/LocationActions'
import { actionTypes as userTypes } from '../actions/UserActions'

const locations = (state = [], action) => {
	switch (action.type) {
		case actionTypes.fetchLocationsSuccess:
			return action.payload.data
		case userTypes.logout:
			return []
		default:
			return state
	}
}

export default combineReducers({
	locations,
})
