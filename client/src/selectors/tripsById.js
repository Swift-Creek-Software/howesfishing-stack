import { createSelector } from 'reselect'

const trips = state => state.trip.trips


const getTripsById = (trips) => {
	return trips.reduce((acc, current) => {
		acc[current.id] = current
		return acc
	}, {})
}

export default createSelector(trips, getTripsById)