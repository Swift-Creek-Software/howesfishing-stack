import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { FormControl, FormGroup, ControlLabel } from 'react-bootstrap'

class SimpleSelectField extends PureComponent {
	static propsTypes = {
		options: PropTypes.array.isRequired,
		label: PropTypes.string.isRequired,
		className: PropTypes.string,
		onChange: PropTypes.func.isRequired
	}


	renderOptions = (options) => {
		return options.map(option => <option key={option.value} value={option.value}>{option.name}</option>)
	}


	render() {
		const { options } = this.props
		return (
			<FormGroup
				controlId="formBasicText"
				className={this.props.className}
			>
				<ControlLabel>{this.props.label}</ControlLabel>
				<FormControl
					componentClass="select"
					onChange={this.props.onChange}
				>
					{this.renderOptions(options)}
				</FormControl>
			</FormGroup>
		)
	}
}
export default SimpleSelectField