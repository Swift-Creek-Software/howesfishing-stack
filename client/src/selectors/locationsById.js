import { createSelector } from 'reselect'

const locations = state => state.location.locations


const getLocationsById = (locations) => {
	return locations.reduce((acc, current) => {
		acc[current.id] = current
		return acc
	}, {})
}

export default createSelector(locations, getLocationsById)