import { createSelector } from 'reselect'

import tripsByid from './tripsById'

const currentTrip = state => state.trip.currentTrip
const tripsById = state => tripsByid(state)

const getTripById = (currentTrip, tripsById) => tripsById[currentTrip] || null

export default createSelector(currentTrip, tripsById, getTripById)