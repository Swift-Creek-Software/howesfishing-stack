import React, { PureComponent } from 'react'
import { Field, reduxForm } from 'redux-form'
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import validatejs from 'validate.js'
import forOwn from 'lodash/forOwn'

import { changePassword } from '../actions/UserActions'

import FormHeader from './Common/FormHeader'
import TextField from './Common/TextField'
import './Common/Common.css'

const validate = (values, props) => {
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

	return errors
}

class PasswordChange extends PureComponent {

	onFormSubmit = (values) => {
		this.props.changePassword({
			...values,
			id: this.props.user.id
		})
		this.props.history.push('/admin/dashboard')
	}

	render() {
		const { handleSubmit } = this.props

		return (
			<div className="form-wrapper">
				<form className="panel panel-primary" onSubmit={handleSubmit(this.onFormSubmit)}>
					<FormHeader>Password Change</FormHeader>
					<div className="panel-body">
						<Field name="password"
							   component={TextField}
							   label="Password"
							   placeholder="Enter Password"
							   type="password"
						/>
						<Field name="confirmPassword"
							   component={TextField}
							   label="Confirm"
							   placeholder="Confirm Password"
							   type="password"
						/>
						<button type="submit" className="btn btn-primary">Change password</button>
					</div>
				</form>
			</div>
		)
	}
}

PasswordChange = reduxForm({
	form: 'passwordChange',
	validate
})(PasswordChange)

PasswordChange = connect(state => {
		return {
			user: state.user
		}
	} ,
	{
		changePassword
	}
)(PasswordChange)

export default withRouter(PasswordChange)