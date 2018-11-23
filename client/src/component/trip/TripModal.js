import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Modal } from 'react-bootstrap'
import moment from 'moment-timezone'
import { Link, withRouter } from 'react-router-dom'

import currentTripSelector from '../../selectors/currentTripSelector'
import locationsById from '../../selectors/locationsById'
import guidesById from '../../selectors/guidesById'
import { setCurrentTrip, setTempTrip } from '../../actions/TripActions'

import TripData from './TripData'
import './TripModal.css'

class TripModal extends PureComponent {
	static propsTypes = {
		//selector
		trip: PropTypes.object.isRequired
	}

	onCloseClick = () => {
		this.props.setCurrentTrip()
	}
	getMomentTime = (dateTime) => {
		return moment(dateTime).tz('America/Denver').format('LT')
	}

	renderGuideString = (guides) => {
		return guides.map(guide => {
			return this.props.guides[ guide.id ].name
		}).join(', ')
	}

	renderDateString = (start, end) => {
		const formatTripDay = (date) => moment(date).tz('America/Denver').format('MMM Do, YYYY')
		const a = moment(start).tz('America/Denver')
		const b = moment(end).tz('America/Denver')
		console.log('moment', a, b, a.diff(b, "days"))
		if(Math.abs(a.diff(b, "days")) > 1) {
			return `${formatTripDay(start)} - ${formatTripDay(end)}`
		}
		return formatTripDay(start)

	}

	onDuplicateClick = () => {
    const { trip } = this.props
		const tempTrip = {...trip, id: undefined, _id: undefined}

		this.props.setTempTrip(tempTrip)
    this.props.history.push('/trip')
	}

	render() {
		const { trip } = this.props
		return (
			<Modal.Dialog>
				<Modal.Header>
					<h3 style={{display: 'inline-block'}}>
						{`${moment(trip.startTime).tz('America/Denver').format('MMM Do')} Trip`}
					</h3>
					<button className="btn btn-warning" style={{ float: 'right' }} onClick={this.onCloseClick}>Close
					</button>
				</Modal.Header>
				<Modal.Body>
					<TripData label="Name" value={`${trip.firstName} ${trip.lastName}`}/>
					<TripData label="Date" value={this.renderDateString(trip.startTime, trip.endTime)}/>
					<TripData label="Time"
							  value={`${this.getMomentTime(trip.startTime)} - ${this.getMomentTime(trip.endTime)}`}/>
          {this.props.user && this.props.user.isAdmin &&
           <TripData label="Email" value={trip.email}/>
          }
          {this.props.user && this.props.user.isAdmin &&
            <TripData label="Phone" value={trip.phone}/>
          }
					<TripData label="Guides" value={this.renderGuideString(trip.guides)}/>
					<TripData label="Guests" value={trip.guests}/>
					{trip.kidsUnder12 &&
           <TripData label="Kids Under 12" value={trip.kidsUnder12}/>
          }
					<TripData label="Cost" value={`$${trip.cost}`}/>
					{this.props.locations[ trip.location ] &&
						<TripData label="Location" value={this.props.locations[ trip.location ].name}/>
					}
					<TripData label="Notes" value={trip.notes || 'none'}/>
				</Modal.Body>
				<Modal.Footer>
					{this.props.user && this.props.user.isAdmin &&
				  	<button className="btn btn-primary" onClick={this.onDuplicateClick}>Duplicate Trip</button>
					}
					{this.props.user && this.props.user.isAdmin &&
				  	<Link to={{ pathname: 'trip', search: 'editing' }} className="btn btn-primary">Edit Trip</Link>
					}
				</Modal.Footer>
			</Modal.Dialog>
		)
	}
}

TripModal = connect(state => {
		return {
			trip: currentTripSelector(state),
			guides: guidesById(state),
			locations: locationsById(state),
			user: state.user
		}
	},
	{
		setCurrentTrip,
    setTempTrip,
	}
)(TripModal)

export default withRouter(TripModal)