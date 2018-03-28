import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import moment from 'moment-timezone'
import tripTimesByGuide from '../selectors/tripTimesByGuide'

import { areDatesInRange } from '../utils/DateUtil'

class AvailableGuides extends PureComponent {

  renderAfternoonGuides = (date) => {
    const start = date.hours(13).minutes(0).seconds(0).toDate()
    const end = date.hours(18).minutes(0).seconds(0).toDate()
    const guides = this.getAvailableGuides(start, end)
    console.log('available guides', guides)
    return guides.map(guide => {
      return <li key={guide.name}>{guide.name}</li>
    })
  }

  renderMorningGuides = (date) => {
    const start = date.hours(7).minutes(0).seconds(0).toDate()
    const end = date.hours(12).minutes(0).seconds(0).toDate()
    const guides = this.getAvailableGuides(start, end)
    console.log('available guides', guides)
    return guides.map(guide => {
      return <li key={guide.name}>{guide.name}</li>
    })
  }

  renderTwilight = (date) => {
    const start = date.hours(18).minutes(30).seconds(0).toDate()
    const end = date.hours(20).minutes(30).seconds(0).toDate()
    const guides = this.getAvailableGuides(start, end)
    console.log('available guides', guides)
    return guides.map(guide => {
      return <li key={guide.name}>{guide.name}</li>
    })
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

  render() {
    let date = this.props.currentDashboardDate ? moment(this.props.currentDashboardDate).tz('America/Denver') : moment().tz('America/Denver')
    date = date.startOf('day')

    if (this.props.view === 'day' && this.props.user.isAdmin) {
      return (
        <div>
          <h2>Available Guides</h2>
          <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
            <div>
              <h3>Morning</h3>
              <ul>
                {this.renderMorningGuides(date)}
              </ul>
            </div>
            <div>
              <h3>Afternoon</h3>
              <ul>
                {this.renderAfternoonGuides(date)}
              </ul>
            </div>
            <div>
              <h3>Twilight</h3>
              <ul>
                {this.renderTwilight(date)}
              </ul>
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
    tripTimesByGuide: tripTimesByGuide(state),
    view: state.trip.view,
    user: state.user,
  }
})(AvailableGuides)