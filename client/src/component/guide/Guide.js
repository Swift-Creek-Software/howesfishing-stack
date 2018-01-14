import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm, FieldArray } from 'redux-form'
import {forOwn} from 'lodash'
import validatejs from 'validate.js'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

import editingGuideSelector from '../../selectors/editingGuideSelector'
import { setEditingGuide, addGuide, updateGuide, deleteGuide } from '../../actions/GuideActions'
import { addUser, deleteUser, changePassword  } from '../../actions/UserActions'
import { sendGuidePasswordEmail } from '../../actions/EmailActions'

import ColorWrapper from './ColorWrapper'
import FormHeader from '../Common/FormHeader'
import TextField from '../Common/TextField'
import DeleteConfirmModal from '../DeleteConfirmModal'
import '../Common/Common.css'
import './Guide.css'

const validate = (values, props) => {
	const errors = {}


	const constraints = {
		name: {
			presence: {
				message: 'required'
			}
		},
		color: {
			presence: {
				message: 'required'
			}
		},
	}

	const validationErrors = validatejs(values, constraints, { fullMessages: false })

	if (validationErrors) {
		forOwn(validationErrors, (value, key) => {
			errors[ key ] = value[ 0 ]
		})
	}

	return errors
}

class Guide extends PureComponent {
	static propsTypes = {
		// redux
		initialValues: PropTypes.object.isRequired
	}
	constructor(props) {
		super(props)

		this.state = {
			showDeleteModal: false
		}
	}

	componentWillUnmount() {
		this.props.setEditingGuide()
	}

	handleSubmit = (values) => {

		if (values.id) {
			this.props.updateGuide(values)
		} else {
			// add user to the db
			const password = Math.random().toString(36).slice(-10);
			const userData = {
				password,
				confirmPassword: password,
				email: values.emails[0],
				access: ['guide'],
				isAdmin: false,
				name: values.name
			}

			this.props.addUser(userData).then(response => {
				// add the guide to the db with the userId for when the guide gets removed
				const userId = response.payload.data.user.id
				this.props.addGuide({...values, userId}).then(response => {
					// add the guideId to the user

					const guideId = response.payload.data.id
					const user = {id: userId, guideId}
					this.props.changePassword(user)
				})
			})

			// send email to user
			this.props.sendGuidePasswordEmail({
				name: values.name,
				email: values.emails[0],
				password
			})
		}
		this.props.history.push('/admin/guides')
	}

	renderEmails = ({ fields, meta: { error } }) => {
		return (
			<div className="guides-data-table">
				<h3 className="group-header">
					Emails
					<button type="button" className="btn btn-primary add-guide" onClick={() => fields.push('')}>
						+ Add Email
					</button>
				</h3>
				<div>
					{this.renderEmailRows(fields)}
				</div>
			</div>
		)
	}

	renderEmailRows = (fields) => {
		const onRemoveClick = (index) => {
			fields.remove(index)
		}

		return fields.map((email, index) => {
			return (
				<div className="guide-data-row" key={`email-${index}`}>
					<Field name={email}
						   component={TextField}
						   label={`Email ${index + 1}`}
						   placeholder="example@email.com"
						   type="email"
					/>
					<button type="button" className="btn btn-danger" onClick={() => {
						onRemoveClick(index)
					}}>
						Remove
					</button>
				</div>
			)
		})
	}

	renderPhones = ({ fields, meta: { error } }) => {
		return (
			<div className="guides-data-table">
				<h3 className="group-header">
					Phones
					<button type="button" className="btn btn-primary add-guide" onClick={() => fields.push('')}>
						+ Add Phone
					</button>
				</h3>
				<div>
					{this.renderPhoneRows(fields)}
				</div>
			</div>
		)
	}

	renderPhoneRows = (fields) => {
		const onRemoveClick = (index) => {
			fields.remove(index)
		}

		return fields.map((phone, index) => {
			return (
				<div className="guide-data-row" key={`phone-${index}`}>
					<Field name={phone}
						   component={TextField}
						   label={`Phone ${index + 1}`}
						   placeholder="14065555555"
						   type="text"
					/>
					<button type="button" className="btn btn-danger" onClick={() => {
						onRemoveClick(index)
					}}>
						Remove
					</button>
				</div>
			)
		})
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

		this.props.deleteGuide(this.props.initialValues.id)
		this.props.deleteUser(this.props.initialValues.userId)
		this.props.history.push('/admin/guides')
	}


	render() {
		const { handleSubmit } = this.props

		return (
			<div className="form-wrapper Guide">
				<form className="panel panel-primary" onSubmit={handleSubmit(this.handleSubmit)}>
					<FormHeader>Guide</FormHeader>
					<div className="panel-body">
						<Field name="name"
							   component={TextField}
							   label="Guide name"
							   placeholder="enter name"
							   type="text"
						/>
						<FieldArray name="phones" component={this.renderPhones}/>
						<FieldArray name="emails" component={this.renderEmails}/>
						<Field name="color"
							   component={ColorWrapper}

						/>
						<div className="button-row">
							<button className="btn btn-danger" style={{float: 'left'}} onClick={this.onDeleteButtonClick}>
								Delete Guide
							</button>
							<Link to='/admin/guides' className="btn btn-warning">Cancel</Link>
							<button className="btn btn-primary">
								{this.props.initialValues ? 'Save' : 'Add Guide'}
							</button>
						</div>
					</div>
				</form>
				{this.state.showDeleteModal &&
				<DeleteConfirmModal onCancelClick={this.closeDeleteModal} onDeleteClick={this.onDeleteConfirm} delete="guide"/>
				}
			</div>
		)
	}
}

Guide = reduxForm({
	form: 'guide',
	validate
})(Guide)

Guide = connect(
	state => {
		return {
			initialValues: editingGuideSelector(state)
		}
	},
	{
		setEditingGuide,
		addGuide,
		changePassword,
		updateGuide,
		addUser,
		sendGuidePasswordEmail,
		deleteGuide,
		deleteUser
	}
)(Guide)
export default withRouter(Guide)