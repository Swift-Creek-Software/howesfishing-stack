import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Field } from 'redux-form'
import { formValueSelector } from 'redux-form';

import tripTimesByGuide from '../../selectors/tripTimesByGuide'

import SelectField from '../Common/SelectField'
import { areDatesInRange } from '../../utils/DateUtil'

class TripGuideSelector extends Component {
	static propsTypes = {
		//redux
		guides: PropTypes.array.isRequired
	}

	renderOptions = () => {
		const guides = this.props.guides.map(guide => {

			const tripTimes = this.props.tripTimesByGuide[ guide.id ]
			const disabled = tripTimes ? tripTimes.some((time) => {
					return areDatesInRange(time.start, time.end, this.props.start, this.props.end)
				}) : false

			return {
				name: guide.name,
				value: guide.id,
				disabled
			}
		})
		guides.unshift({
			name: 'Select a guide',
			value: 'foo',
		})

		return guides
	}

	render() {
		return (
			<Field name={`${this.props.field}.id`}
				   className="guide-field"
				   component={SelectField}
				   label="Guide"
				   options={this.renderOptions()}
			/>
		)
	}
}

TripGuideSelector = connect(state => {
		const selector = formValueSelector('addtrip')
		return {
			guides: state.guide.guides,
			tripTimesByGuide: tripTimesByGuide(state),
			start: selector(state, 'startTime'),
			end: selector(state, 'endTime')
		}
	}
)(TripGuideSelector)


export default TripGuideSelector