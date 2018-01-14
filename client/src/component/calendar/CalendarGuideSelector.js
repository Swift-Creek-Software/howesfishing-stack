import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import { setCurrentGuide } from '../../actions/GuideActions'

import SimpleSelectField from '../Common/SimpleSelectField'

class CalendarGuideSelector extends PureComponent {

	renderGuideOptions = () => {
		const guideOptions = this.props.guides.map(guide => {
				return {
					name: guide.name,
					value: guide.id,
				}
			}
		)
		guideOptions.unshift({
			name: 'All',
			value: 'ALL',
		})

		return guideOptions
	}

	onGuideChange = (e) => {
		this.props.setCurrentGuide(e.target.value !== 'ALL' ? e.target.value : null)
	}

	render() {
		return (
			<div>
				<SimpleSelectField
					label="Guide"
					options={this.renderGuideOptions()}
					onChange={this.onGuideChange}
				/>
			</div>
		)
	}
}

CalendarGuideSelector = connect(state => {
		return {
			guides: state.guide.guides,
		}
	},
	{
		setCurrentGuide
	}
)(CalendarGuideSelector)

export default CalendarGuideSelector