import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect, withRouter } from 'react-router-dom'


import LoginForm from './LoginForm'
import './Common/Common.css'

class Login extends PureComponent {
	static propTypes = {
		user: PropTypes.object
	}

	render() {
		if (this.props.user.isLoggedIn) {
			return <Redirect to={'/admin/dashboard'}/>
		}

		return (
			<div className="form-wrapper">
				<LoginForm/>
			</div>
		)
	}
}

export default connect(state => {
		return {
			user: state.user
		}
	}
)(withRouter(Login))