import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { setCurrentTrip } from '../../actions/TripActions'


class CalendarMonthEvent extends PureComponent {
	onEventClick = () => {
		this.props.setCurrentTrip(this.props.event.id)
	}

	render() {
		const { event } = this.props

		return (
			<div style={{ backgroundColor: event.color, borderRadius: 5 }} onClick={this.onEventClick}>
				{this.props.children}
			</div>
		)
	}

}


CalendarMonthEvent.propTypes = {
	event: PropTypes.object.isRequired
}
CalendarMonthEvent = connect(null, { setCurrentTrip })(CalendarMonthEvent)
export default withRouter(CalendarMonthEvent)