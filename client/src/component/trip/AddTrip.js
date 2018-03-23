import React, { Component } from 'react'
import forOwn from 'lodash/forOwn'
import find from 'lodash/find'
import { Field, reduxForm, FieldArray, formValueSelector, change } from 'redux-form'
import validatejs from 'validate.js'
import { connect } from 'react-redux'
import moment from 'moment-timezone'
import { Link, withRouter } from 'react-router-dom'

import { sendSMS } from '../../actions/TextActions'
import {
	sendClientConfirmationEmail,
	sendGuideConfirmationEmail,
	sendGuideCancellationEmail,
	sendClientCancellationEmail
} from '../../actions/EmailActions'

import {addTrip, updateTrip, deleteTrip, setCurrentTrip} from '../../actions/TripActions'
import guidesById from '../../selectors/guidesById'
import currentTripSelector from '../../selectors/currentTripSelector'

import FormHeader from '../Common/FormHeader'
import TextField from '../Common/TextField'
import SelectField from '../Common/SelectField'
import TextAreaField from '../Common/TextAreaField'
import DateTimeField from '../Common/DateTimeField'
import Checkbox from '../Common/Checkbox'
import TripGuideRow from './TripGuideRow'
import DeleteConfirmModal from '../DeleteConfirmModal'

import 'react-datetime/css/react-datetime.css'
import '../Common/Common.css'
import './AddTrip.css'

const validate = (values) => {
	const errors = {}


	const constraints = {
		firstName: {
			presence: {
				message: 'required'
			}
		},
		lastName: {
			presence: {
				message: 'required'
			}
		},
		email: {
			presence: {

				message: 'required'
			},
			email: {
				message: 'you must enter a valid email'
			},
		},
		phone: {
			presence: {
				message: 'required'
			}
		},
		guests: {
			presence: {
				message: 'required'
			}
		},
		cost: {
			presence: {
				message: 'required'
			}
		}
	}

	const validationErrors = validatejs(values, constraints, { fullMessages: false })

	if (validationErrors) {
		forOwn(validationErrors, (value, key) => {
			errors[ key ] = value[ 0 ]
		})
	}

	if (!values.guides || !values.guides.length) {
		errors.guides = 'You must choose at least one guide'
	} else {
		const guideArrayErrors = []
		values.guides.forEach((guide, index) => {
			const guideErrors = {}
			if (!guide || !guide.id || guide.id === 'foo') {
				guideErrors.id = 'required'
				guideArrayErrors[ index ] = guideErrors
			}
			if (!guide || !guide.guests) {
				guideErrors.guests = 'required'
				guideArrayErrors[ index ] = guideErrors
			}
			if (!guide || !guide.textTemplate) {
				guideErrors.textTemplate = 'required'
				guideArrayErrors[ index ] = guideErrors
			}
		})
		if (guideArrayErrors.length) {
			errors.guides = guideArrayErrors
		}
	}

	return errors
}


class AddTrip extends Component {
	constructor(props) {
		super(props)

		this.state = {
			showDeleteModal: false
		}
	}

	handleSubmit = (values) => {
		values.directions = this.getDirections(values.location)

		if(values.id) {
			this.props.updateTrip(this.getTripValues(values)).then(() => {

				// send info to guides
				this.sendGuidesInfo(values.guides, values.notes, values.startTime)

				if(values.sendClientEmail) {
					// send client/admin email
					this.props.sendClientConfirmationEmail({...values, userName: this.props.user.name.split(' ')[0]})
				}
				this.props.history.push('/dashboard')

			})
		} else {
			this.props.addTrip(this.getTripValues(values)).then(() => {

				// send info to guides
				this.sendGuidesInfo(values.guides, values.notes, values.startTime)

				if(values.sendClientEmail) {
					// send client/admin email
					this.props.sendClientConfirmationEmail({...values, userName: this.props.user.name.split(' ')[0]})
				}
				this.props.history.push('/dashboard')

			})
		}

	}

	getDirections = (locationId) => {
		const location = find(this.props.locations, location => location.id === locationId)
		return location ? location.directions : ``
	}

	getTripValues = (values) => {
		return {...values, startTime: moment(values.startTime).tz('America/Denver').toISOString(), endTime: moment(values.endTime).tz('America/Denver').toISOString(), userName: this.props.user.name.split(' ')[0]}
	}

	sendGuidesInfo = (guides, notes, date) => {
		guides.forEach(guide => {
			if(guide.sendConfirmation) {
				//if we checked the box to email the guide
				const guideDetail = this.props.guides[ guide.id ]
				const guideMessage = `${guide.textTemplate} ${notes ? `Notes: ${notes}` : ''}`

				// send guide texts
				guideDetail.phones.forEach(phone => {
					this.props.sendSMS(phone, `${guideDetail.name} - ${guideMessage}`)
				})

				if(guideDetail.emails && guideDetail.emails.length > 0) {
					const guideEmailValues = {
						emails: guideDetail.emails,
						body: guideMessage,
						name: guideDetail.name,
						date,

					}
					// send guide emails
					this.props.sendGuideConfirmationEmail(guideEmailValues)
				}

			}
		})
	}


	renderGuides = ({ fields, meta: { touched, error, submitFailed } }) => {
		return (
			<div className="guides-section">
				<h3 className="group-header">
					Guides
					<button type="button" className="btn btn-primary add-guide" onClick={() => fields.unshift({sendConfirmation:true, guests: this.props.guests})}>
						+ Add Guide
					</button>
				</h3>
				<div>
					{this.renderGuideRows(fields)}
				</div>
			</div>
		)
	}

	renderGuideRows = (fields) => {
		const onRemoveClick = (index) => {
			fields.remove(index)
		}
		return fields.map((field, index) => <TripGuideRow key={index} index={index} field={field}
														  onRemoveClick={onRemoveClick}/>)
	}

	templateNormalizer = (value, previousValue, allValues) => {
		const { startTime, endTime, guests, guides, cost } = allValues
		if (value) {
			return value
		} else {
			return `${startTime ? this.formatDate(startTime) : ''}, ${startTime ? this.formatHours(startTime) : ''} - ${endTime ? this.formatHours(endTime) : ''} for ${guests || ''} people. Cost: $${cost || ''}`
		}
	}

	formatHours = (time) => moment(time).tz('America/Denver').format('LT')
	formatDate = (time) => moment(time).tz('America/Denver').format('MMMM Do')

	onStartChange = (event, newValue) => {
		const startHours = newValue.hours()
		this.props.change('endTime', moment(newValue).tz('America/Denver').hour(startHours + 5))
	}

	onDeleteButtonClick = (event) => {
		event.preventDefault()
		this.setState({ showDeleteModal: true })
	}

	closeDeleteModal = (event) => {
		event.preventDefault()
		this.setState({ showDeleteModal: false })
	}

	onDeleteConfirm = (event) => {
		event.preventDefault()

		this.props.deleteTrip(this.props.initialValues.id).then(() => {
			this.sendGuidesCancelationEmail()


			if(this.props.sendClientEmail) {
				this.sendClientCancellationEmail()
			}

			// move back to the dashboard with no trip selected
			this.props.setCurrentTrip()
			this.props.history.push('/dashboard')
		})


	}

	sendClientCancellationEmail = () => {
		const values = {
			firstName: this.props.firstName,
			startTime: this.props.startTime,
			email: this.props.clientEmail
		}
		this.props.sendClientCancellationEmail(values)

	}

	sendGuidesCancelationEmail = () => {
		this.props.tripGuides.forEach(guide => {
			if(guide.sendConfirmation) {
				const guideDetail = this.props.guides[ guide.id ]

				const dateTime = `${moment(this.props.startTime).tz('America/Denver').format('MMMM DD, YYYY')} from ${moment(this.props.startTime).tz('America/Denver').format('ha')} - ${moment(this.props.endTime).tz('America/Denver').format('ha')}`
				const guideMessage = `${guideDetail.name} your trip on ${dateTime} has been CANCELLED`

				// send guide texts
				guideDetail.phones.forEach(phone => {
					this.props.sendSMS(phone, guideMessage)
				})

				const guideEmailValues = {
					emails: guideDetail.emails,
					dateTime,
					name: guideDetail.name,
				}

				if (guide.emails && guide.emails.length > 0) {
					this.props.sendGuideCancellationEmail(guideEmailValues)
				}
			}
		})
	}

	locationOptions = () => {
		const locations =  this.props.locations.map(location => {
			return { name: location.name, value: location.id }
		})
		locations.unshift({name: 'Select a location', value: 1})
		locations.push({name: 'See notes below', value: 2})

		return locations
	}

	render() {
		const { handleSubmit } = this.props

		const isEditing = this.props.location.search.indexOf('editing') > 0
		const isAble = this.props.user.email === 'admin@aablefishing.com' || this.props.user.email === 'Mike@howesfishing.com'

		return (
			<div className="form-wrapper AddTrip">
				<form className="panel panel-primary" onSubmit={handleSubmit(this.handleSubmit)}>
					<FormHeader>Create Trip</FormHeader>
					<div className="panel-body">
						<div className="form-fields">
							<Field name="firstName"
								   component={TextField}
								   label="First name"
								   placeholder="enter first name"
								   type="text"
							/>
							<Field name="lastName"
								   component={TextField}
								   label="Last name"
								   placeholder="enter last name"
								   type="text"
							/>
							{!(isEditing && !isAble) &&
							<Field name="email"
								   component={TextField}
								   label="Email"
								   placeholder="example@fishing.com"
								   type="email"
							/>
							}
							{!(isEditing && !isAble) &&
							<Field name="phone"
								   component={TextField}
								   label="Phone number"
								   placeholder="(406) 555-5555"
								   type="phone"
							/>
							}
							<Field name="startTime"
								   component={DateTimeField}
								   placeholder="04/11/2017 7:00 AM"
								   label="Trip Start"
								   onChange={this.onStartChange}
							/>
							<Field name="endTime"
								   component={DateTimeField}
								   label="Trip End"
								   placeholder="04/11/2017 12:00 PM"
							/>
							<Field name="guests"
								   component={TextField}
								   label="Number of guests"
								   placeholder="4"
								   type="text"
							/>
							<Field name="cost"
								   component={TextField}
								   label="Cost"
								   placeholder="400"
								   type="text"
							/>
							<Field name="location"
								   component={SelectField}
								   label="Location"
								   placeholder="select"
								   options={this.locationOptions()}
							/>
							<Field name="sendClientEmail"
								   component={Checkbox}
								   label='Send Client Confirmation?'
							/>
						</div>
						<FieldArray name="guides" component={this.renderGuides}/>
						<Field name="clientEmailTemplate"
							   component={TextField}
							   label="Client email template"
							   placeholder="click here for client template"
							   type="text"
							   normalize={this.templateNormalizer}
						/>
						<Field name="notes"
							   component={TextAreaField}
							   label="Notes"
							   placeholder="add notes here..."
						/>
						{isEditing && isAble &&
						<buton onClick={this.onDeleteButtonClick} className="btn btn-danger">Delete Trip</buton>
						}

						<button type="submit" className="btn btn-primary" style={{ float: 'right' }}>
							{this.props.initialValues.id ? 'Save Trip' : 'Create Trip'}
						</button>
						<Link to="/dashboard" className="btn btn-warning" style={{ float: 'right', marginRight: 10 }}>Cancel</Link>
					</div>
				</form>
				{this.state.showDeleteModal &&
				<DeleteConfirmModal onCancelClick={this.closeDeleteModal} onDeleteClick={this.onDeleteConfirm} delete="Trip"/>
				}
			</div>
		)
	}
}

AddTrip = reduxForm({
	form: 'addtrip',
	validate
})(AddTrip)

AddTrip = connect(state => {
		const selector = formValueSelector('addtrip')
		return {
			guides: guidesById(state),
			endTime: selector(state, 'endTime'),
			clientEmail: selector(state, 'email'),
			firstName: selector(state, 'firstName'),
			guests: selector(state, 'guests'),
			tripGuides: selector(state, 'guides'),
			startTime: selector(state, 'startTime'),
			sendClientEmail: selector(state, 'sendClientEmail'),
			locations: state.location.locations,
			user: state.user,
			initialValues: {
				sendClientEmail: true,
				startTime: moment(state.trip.currentDashboardDate || new Date()).tz('America/Denver').hours(7).minutes(0).toDate(),
				endTime: moment(state.trip.currentDashboardDate || new Date()).tz('America/Denver').hours(12).minutes(0).toDate(),
				...currentTripSelector(state),
			},
		}
	},
	{
		change,
		sendSMS,
		addTrip,
		updateTrip,
		deleteTrip,
		setCurrentTrip,
		sendClientConfirmationEmail,
		sendGuideConfirmationEmail,
		sendGuideCancellationEmail,
		sendClientCancellationEmail,
	}
)(AddTrip)

export default withRouter(AddTrip)
