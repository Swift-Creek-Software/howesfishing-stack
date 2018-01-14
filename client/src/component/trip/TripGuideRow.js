import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import moment from 'moment-timezone'

import TextField from '../Common/TextField'
import Checkbox from '../Common/Checkbox'

import TripGuideSelect from './TripGuideSelect'
import './TripGuideRow.css'

class AddGuideRow extends PureComponent {
	static propsTypes = {
		//redux
		guides: PropTypes.array.isRequired,
		// props
		key: PropTypes.number.isRequired,
		index: PropTypes.number.isRequired,
		field: PropTypes.object.isRequired,
		onRemoveClick: PropTypes.func.isRequired
	}

	onRemoveClick = () => {
		this.props.onRemoveClick(this.props.index)
	}

	templateNormalizer = (value, previousValue, allValues) => {
		const { startTime, endTime, guides, cost } = allValues
		const guideGuests = guides[ this.props.index ].guests
		if (value) {
			return value
		} else {
			return `${startTime ? this.formatDate(startTime) : ''}, ${startTime ? this.formatHours(startTime) : ''} - ${endTime ? this.formatHours(endTime) : ''} for ${guideGuests || ''} people. Cost $${cost || ''}`
		}
	}

	formatHours = (time) => moment(time).tz('America/Denver').format('LT')
	formatDate = (time) => moment(time).tz('America/Denver').format('MMMM Do')

	render() {
		return (
			<div className="TripGuideRow" key={`Guide-${this.props.index + 1}`}>
				<div className="guide-header">
					<h4>Guide {this.props.index + 1}</h4>
					<button type="button" className="btn btn-danger" onClick={this.onRemoveClick}>
						Remove
					</button>
				</div>
				<TripGuideSelect field={this.props.field}/>
				<Field name={`${this.props.field}.guests`}
					   className="guide-field"
					   component={TextField}
					   label="Guests"
					   placeholder="1"
					   type="text"
				/>
				<Field name={`${this.props.field}.textTemplate`}
					   className="guide-field template"
					   component={TextField}
					   label="Guide Text Template"
					   placeholder="click here for template"
					   type="text"
					   normalize={this.templateNormalizer}
				/>
				<Field name={`${this.props.field}.sendConfirmation`}
					   className="guide-field"
					   component={Checkbox}
					   label="Send Guide text/email?"
				/>
			</div>
		)
	}
}


export default AddGuideRow