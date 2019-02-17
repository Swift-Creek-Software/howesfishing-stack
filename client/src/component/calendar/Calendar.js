import React, { Component } from 'react'
import moment from 'moment-timezone';
import { connect } from 'react-redux'
import BigCalendar from 'react-big-calendar';

import guideTripsSelector from '../../selectors/guideTripsSelector'

import { fetchTrips, setCurrentDate, setLoading, setView } from '../../actions/TripActions'

import CalendarGuideSelector from './CalendarGuideSelector'
import CalendarMonthEvent from './CalendarMonthEvent'
import AvailableGuides from '../AvailableGuides'

import 'react-big-calendar/lib/css/react-big-calendar.css'
import './Calendar.css'


const localizer = BigCalendar.momentLocalizer(moment)

class Calendar extends Component {

	renderEventsList = () => {

		return this.props.trips.reduce((acc, trip) => {
			if(trip.guide) {
				// console.log('good trip', trip)
				acc.push({
					title: `${trip.guide.name.split(' ')[ 0 ]} - ${trip.firstName} ${trip.lastName}`,
					start: trip.startTime,
					end: trip.endTime,
					color: trip.guide.color,
					id: trip.id
				})
			} else {
				console.log('bad trip', trip)
			}
			return acc
		}, [])
	}

	onRefreshClick = (e) => {
		e.preventDefault()
		this.props.setLoading(true)
		this.props.fetchTrips().then(() => {
			this.props.setLoading()
		})
	}

	onNavigate = (date) => {
		this.props.setCurrentDate(date)
	}

	onView = (view) => {
		this.props.setView(view)
	}

	render() {
		return (
			<div className={`Calendar ${this.props.view === 'day' ? 'full' : ''}`} id="no-print">
				<AvailableGuides/>
				<div className="refresh">
					{this.props.user.isAdmin &&
					<CalendarGuideSelector/>
					}
					<div className="link">
						<a href="#" onClick={this.onRefreshClick}>Refresh Trips</a>
					</div>
				</div>
				<BigCalendar
          localizer={localizer}
					popup
					events={this.renderEventsList()}
					startAccessor='start'
					endAccessor='end'
					defaultDate={new Date()}
					components={{ eventWrapper: CalendarMonthEvent }}
					onNavigate={this.onNavigate}
					onView={this.onView}
				/>
			</div>
		)
	}
}

export default connect(state => {
	return {
		trips: guideTripsSelector(state),
		user: state.user,
		view: state.trip.view
	}
}, {
	fetchTrips,
	setCurrentDate,
	setLoading,
	setView
})(Calendar)