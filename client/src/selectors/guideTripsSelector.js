import { createSelector } from 'reselect'

import allTripsSelector from './allTripsSelector'

const currentGuide = state => state.guide.currentGuide
const trips = state => allTripsSelector(state)

const getTrips = (currentGuide, trips) => {

	return currentGuide ? trips.filter(trip => {
		return trip.guide.id == currentGuide
		}) : trips
}

export default createSelector(currentGuide, trips, getTrips)
