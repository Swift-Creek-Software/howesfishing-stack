export const actionTypes = {
	addTrip: 'ADD_TRIP',
	addTripSuccess: 'ADD_TRIP_SUCCESS',
	deleteTrip: 'DELETE_TRIP',
	fetchTrips: 'FETCH_TRIPS',
	fetchTripsSuccess: 'FETCH_TRIPS_SUCCESS',
	setCurrentTrip: 'SET_CURRENT_TRIP',
	setCurrentDate: 'SET_CURRENT_DATE',
	setView: 'SET_VIEW',
	updateTrip: 'UPDATE_TRIP',
	setLoading: 'SET_LOADING'
}

export const fetchTrips = (limit = 300) => {
	return {
		type: actionTypes.fetchTrips,
		payload: {
			request: {
				url: `trips`,
				params: {
					limit
				}
			}
		}
	}
}

export const addTrip = (data) => {
	return {
		type: actionTypes.addTrip,
		payload: {
			request: {
				url: 'trips',
				method: 'post',
				data
			}
		}
	}
}

export const updateTrip = (data) => {
	return {
		type: actionTypes.updateTrip,
		payload: {
			request: {
				url: `trips/${data.id}`,
				method: 'put',
				data
			}
		}
	}
}

export const deleteTrip = (id) => {
	return {
		type: actionTypes.deleteTrip,
		payload: {
			request: {
				url: `trips/${id}`,
				method: 'delete',
			},
			id
		}
	}
}

export const setCurrentTrip = (id = null) => {
	return {
		type: actionTypes.setCurrentTrip,
		payload: id
	}
}
export const setView = (view = null) => {
	return {
		type: actionTypes.setView,
		payload: view
	}
}

export const setCurrentDate = (date) => {
	return {
		type: actionTypes.setCurrentDate,
		payload: date
	}
}

export const setLoading = (loading = false) => {
	return {
		type: actionTypes.setLoading,
		payload: loading
	}
}