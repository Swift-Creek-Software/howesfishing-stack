import { createSelector } from 'reselect'

import allTripsSelector from './allTripsSelector'

const trips = state => allTripsSelector(state)

const getTripTimesByGuide = ( trips) => {

	return trips.reduce((acc, trip) => {
		if(trip.guide) {
			if(acc[trip.guide.id]) {
				acc[trip.guide.id].push(
					{
						start: trip.startTime,
						end: trip.endTime
					}
				)
			} else {
				acc[trip.guide.id] = [{ start: trip.startTime, end: trip.endTime }]
			}
		}


		return acc
	}, {})
}

export default createSelector(trips, getTripTimesByGuide)
