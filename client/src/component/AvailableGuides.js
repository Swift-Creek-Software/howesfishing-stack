import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import moment from 'moment-timezone'
import {withRouter} from 'react-router-dom'

import {setTempTrip} from '../actions/TripActions'
import tripTimesByGuide from '../selectors/tripTimesByGuide'
import guidesById from '../selectors/guidesById'

import { areDatesInRange } from '../utils/DateUtil'
import SimpleSelectField from "./Common/SimpleSelectField"

class AvailableGuides extends PureComponent {

  renderAfternoonGuides = (date) => {
    const start = date.hours(13).minutes(0).seconds(0).toDate()
    const end = date.hours(18).minutes(0).seconds(0).toDate()
    const guides = this.getAvailableGuides(start, end)
    return this.mapGuidesForSelect(guides)
  }

  renderMorningGuides = (date) => {
    const start = date.hours(7).minutes(0).seconds(0).toDate()
    const end = date.hours(12).minutes(0).seconds(0).toDate()
    const guides = this.getAvailableGuides(start, end)
    return this.mapGuidesForSelect(guides)
  }

  renderTwilight = (date) => {
    const start = date.hours(18).minutes(30).seconds(0).toDate()
    const end = date.hours(20).minutes(30).seconds(0).toDate()
    const guides = this.getAvailableGuides(start, end)
    return this.mapGuidesForSelect(guides)
  }

  getAvailableGuides = (start, end) => {
    return this.props.guides.filter(guide => {

      const tripTimes = this.props.tripTimesByGuide[ guide.id ]
      const disabled = tripTimes ? tripTimes.some((time) => {
        return areDatesInRange(time.start, time.end, start, end)
      }) : false
      return !disabled
    })
  }

  onMorningSelected = (e) => {
    const guideId = e.target.value
    let date = this.props.currentDashboardDate ? moment(this.props.currentDashboardDate).tz('America/Denver') : moment().tz('America/Denver')
    const start = date.hours(7).minutes(0).seconds(0).toDate()
    const end = date.hours(12).minutes(0).seconds(0).toDate()
    this.createTripForTimeAndGuid(guideId, start, end)
  }

  onAfternoonSelected = (e) => {
    const guideId = e.target.value
    let date = this.props.currentDashboardDate ? moment(this.props.currentDashboardDate).tz('America/Denver') : moment().tz('America/Denver')
    const start = date.hours(13).minutes(0).seconds(0).toDate()
    const end = date.hours(18).minutes(0).seconds(0).toDate()
    this.createTripForTimeAndGuid(guideId, start, end)
  }

  onTwilightSelected = (e) => {
    const guideId = e.target.value
    let date = this.props.currentDashboardDate ? moment(this.props.currentDashboardDate).tz('America/Denver') : moment().tz('America/Denver')
    const start = date.hours(18).minutes(30).seconds(0).toDate()
    const end = date.hours(20).minutes(30).seconds(0).toDate()
    this.createTripForTimeAndGuid(guideId, start, end)
  }

  createTripForTimeAndGuid = (guideId, start, end) => {
    const guide = this.props.guidesById[guideId]
    const tempTrip = {
      startTime: start,
      endTime: end,
      guides: [
        {
          id: guideId,
        }
      ]
    }

    this.props.setTempTrip(tempTrip)
    this.props.history.push('/trip')
    console.log('creating trip for guide', guide, start, end)

  }

  mapGuidesForSelect = (guides) => {
    const selectGuides =  guides.map(guide => {
      return {
        name: guide.name,
        value: guide.id,
      }
    })

    selectGuides.unshift({
      name: "Select Guide",
      value: 'SELECT'
    })

    return selectGuides
  }

  render() {
    let date = this.props.currentDashboardDate ? moment(this.props.currentDashboardDate).tz('America/Denver') : moment().tz('America/Denver')
    date = date.startOf('day')

    if (this.props.view === 'day' && this.props.user.isAdmin) {
      return (
        <div>
          <h2>Available Guides</h2>
          <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
            <div>
              <SimpleSelectField options={this.renderMorningGuides(date)} label="Morning" onChange={this.onMorningSelected}/>
            </div>
            <div>
              <SimpleSelectField options={this.renderAfternoonGuides(date)} label="Afternoon" onChange={this.onAfternoonSelected}/>
            </div>
            <div>
              <SimpleSelectField options={this.renderTwilight(date)} label="Twilight" onChange={this.onTwilightSelected}/>
            </div>
          </div>
        </div>
      )
    }
    return null
  }
}

export default connect(state => {
  return {
    currentDashboardDate: state.trip.currentDashboardDate,
    guides: state.guide.guides,
    guidesById: guidesById(state),
    tripTimesByGuide: tripTimesByGuide(state),
    view: state.trip.view,
    user: state.user,
  }
},
  {
    setTempTrip
  }
)(withRouter((AvailableGuides)))