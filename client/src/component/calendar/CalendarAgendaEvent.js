import React from 'react'
import { connect } from "react-redux"
import find from "lodash/find"

function CalendarAgendaEvent({ event, title, trips, locations }) {
  const trip = find(trips, t => t._id === event.id)
  console.log('event',trip)
  const location = trip.location && find(locations, l => l._id === trip.location)
  // console.log('props',event, trip)
  return (
    <div>{title} - cost:{trip.cost}{location && ` - ${location.name}`}</div>
  )
}

const mapStateToProps = (state) => {
  return {
    trips: state.trip.trips,
    locations: state.location.locations
  }
}

export default  connect(mapStateToProps)(CalendarAgendaEvent)