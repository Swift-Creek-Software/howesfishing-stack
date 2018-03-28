import { createSelector } from 'reselect'

import guidesById from './guidesById'

const trips = state => state.trip.trips
const guides = state => guidesById(state)


const getAllTrips = (trips, guides) => {
	return trips.reduce((acc, current) => {
		if(current.guides && Array.isArray(current.guides)) {
			current.guides.forEach(guide => {
				if(guides[guide.id]) {
					acc.push({...current, guide: guides[guide.id]})
				}else {
					console.log('bad guide', guide, guides)
				}
			})
		}
		return acc
	}, [])
}

export default createSelector(trips, guides, getAllTrips)