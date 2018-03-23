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
      client: 'base',
			request: {
				url: `api/trips`,
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
      client: 'base',
			request: {
				url: 'api/trips',
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
      client: 'base',
			request: {
				url: `api/trips/${data.id}`,
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
      client: 'base',
			request: {
				url: `api/trips/${id}`,
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