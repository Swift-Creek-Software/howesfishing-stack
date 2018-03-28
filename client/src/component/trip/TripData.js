import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class TripData extends PureComponent {
	static propsTypes = {
		label: PropTypes.string.isRequired,
		value: PropTypes.string.isRequired,
	}

	render() {
		return (
			<div>
				<span style={{fontWeight: 'bold'}}>{this.props.label}:&nbsp;</span>
				<span>{this.props.value}</span>
			</div>

		)
	}
}

export default TripData