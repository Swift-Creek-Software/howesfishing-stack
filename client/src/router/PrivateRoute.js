import React  from 'react'
import PropTypes from 'prop-types'
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({ component, user, isAdmin, ...rest }) => {
	return (
		<Route {...rest} render={props => {
			if(user.isLoggedIn) {
				// just being a user isn't enough for our admin routes
				if (isAdmin) {
					if(user.isAdmin) {
						return React.createElement(component, props)
					} else {
						return (
							<Redirect to={{
								pathname: '/dashboard',
								state: { from: props.location }
							}}/>
						)
					}
				} else {
					return React.createElement(component, props)
				}

			} else {
				return (
					<Redirect to={{
						pathname: '/login',
						state: { from: props.location }
					}}/>
				)
			}
		}}/>
	)
}

PrivateRoute.propTypes = {
	user: PropTypes.object
}

export default PrivateRoute
