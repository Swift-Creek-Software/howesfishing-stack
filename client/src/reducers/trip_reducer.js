import {actionTypes} from '../actions/TripActions'
import { combineReducers } from 'redux'
import { actionTypes as userTypes } from '../actions/UserActions'

const trips = (state = [], action) => {
	switch(action.type) {
		case actionTypes.fetchTripsSuccess:
			return action.payload.data.map(trip => {
				return { ...trip, startTime: new Date(trip.startTime), endTime: new Date(trip.endTime)}
			})
		case actionTypes.addTripSuccess: {
			const trip = action.payload.data
			return [...state, { ...trip, startTime: new Date(trip.startTime), endTime: new Date(trip.endTime)}]
		}
		case actionTypes.updateTrip: {
			const trip = action.payload.request.data
			return state.map(stateTrip => {
				if (stateTrip.id === trip.id) {
					return { ...trip, startTime: new Date(trip.startTime), endTime: new Date(trip.endTime)}
				} else {
					return stateTrip
				}
			})
		}
		case actionTypes.deleteTrip:
			const tripId = action.payload.id
			return state.filter(stateTrip => stateTrip.id !== tripId)
		case userTypes.logout:
			return []
		default:
			return state
	}
}

const currentTrip = (state = null, action) => {
	switch(action.type) {
		case actionTypes.setCurrentTrip:
			return action.payload
		case actionTypes.addTripSuccess:
			return action.payload.data['_id']
		case userTypes.logout:
			return null
		default:
			return state
	}
}

const currentDashboardDate = (state = null, action) => {
	switch(action.type) {
		case actionTypes.setCurrentDate:
			return action.payload
		case userTypes.logout:
		case actionTypes.clearTempTrip:
			return null
		default:
			return state
	}
}

const loading = (state = false, action) => {
	switch(action.type) {

		case actionTypes.setLoading:
			return action.payload
		case userTypes.logout:
			return false
		default:
			return state
	}
}

const view = (state = null, action) => {
	switch(action.type) {

		case actionTypes.setView:
			return action.payload
		case userTypes.logout:
			return null
		default:
			return state
	}
}

const tempTrip = (state = null, action) => {
  switch(action.type) {

    case actionTypes.setTempTrip:
      return action.trip
    case actionTypes.clearTempTrip:
      return null
    default:
      return state
  }
}

const tripReducer = combineReducers({
	currentDashboardDate,
	currentTrip,
	loading,
	trips,
  tempTrip,
	view
})

export default tripReducer
