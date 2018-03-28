import { combineReducers } from 'redux'
import { actionTypes } from '../actions/GuideActions'
import { actionTypes as userTypes } from '../actions/UserActions'

const guides = (state = [], action) => {
	switch (action.type) {
		case actionTypes.fetchGuidesSuccess:
			return action.payload.data
		case actionTypes.addGuideSuccess:
			return [...state, action.payload.data]
		case actionTypes.updateGuide:
			const guide = action.payload.request.data
			return state.map(stateGuide => {
				if (stateGuide.id === guide.id) {
					return guide
				} else {
					return stateGuide
				}
			})
		case actionTypes.deleteGuide:
			const guideId = action.payload.id
			return state.filter(stateGuide => stateGuide.id !== guideId)
		case userTypes.logout:
			return []
		default:
			return state
	}
}

const currentGuide = (state = null, action) => {
	switch (action.type) {
		case actionTypes.setCurrentGuide :
			return action.payload
		default:
			return state
	}
}

const editingGuide = (state = null, action) => {
	switch (action.type) {
		case actionTypes.setEditingGuide :
			return action.payload
		default:
			return state
	}
}

const guideReducer = combineReducers({
	guides,
	currentGuide,
	editingGuide
})

export default guideReducer
