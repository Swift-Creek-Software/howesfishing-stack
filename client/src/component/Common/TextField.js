import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { FormControl, FormGroup, ControlLabel } from 'react-bootstrap'

class TextField extends PureComponent {
	static propsTypes = {
		onChange: PropTypes.func.isRequired,
		type: PropTypes.string.isRequired,
		placeholder: PropTypes.string.isRequired,
		label: PropTypes.string.isRequired,
		validationState: PropTypes.string.isRequired,
	}

	getValidationState = () => {
		const { touched, valid } = this.props.meta
		if (touched) {
			return valid ? 'success' : 'error'
		}
		return null
	}

	renderError = () => {
		const { touched, valid, error } = this.props.meta
		if (touched) {
			return valid ? null : error
		}
		return null
	}


	render() {
		return (
			<FormGroup
				controlId="formBasicText"
				validationState={this.getValidationState()}
				className={this.props.className}
			>
				<ControlLabel>{this.props.label}</ControlLabel>
				<FormControl
					{...this.props.input}
					type={this.props.type}
					placeholder={this.props.placeholder}
				/>
				<FormControl.Feedback />
				<span>{this.renderError()}</span>
			</FormGroup>
		)
	}
}

export default TextField