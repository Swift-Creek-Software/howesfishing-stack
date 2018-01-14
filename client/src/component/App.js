import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
	BrowserRouter as Router,
	Route,
	Redirect

} from 'react-router-dom'

import PrivateRoute from '../router/PrivateRoute'
import Login from './Login'
import AddTrip from './trip/AddTrip'
import Dashboard from './Dashboard'
import Guides from './guide/Guides'
import Guide from './guide/Guide'
import Navbar from './NavBar'
import PasswordChange from './PasswordChange'
import './App.css'

class App extends Component {
	render() {
		const { user, loading } = this.props
		return (
			<Router>
				<div style={{ height: '100%' }}>
					<Navbar />
					<Route exact path="/admin/" render={() => (
						<Redirect to="/admin/dashboard"/>
					)}/>
					<Route exact path="/admin/login" component={Login}/>
					<PrivateRoute path="/admin/trip" component={AddTrip} user={user} isAdmin/>
					<PrivateRoute path="/admin/guide" component={Guide} user={user} isAdmin/>
					<PrivateRoute path="/admin/guides" component={Guides} user={user} isAdmin/>
					<PrivateRoute path="/admin/dashboard" component={Dashboard} user={user}/>
					<PrivateRoute path="/admin/password" component={PasswordChange} user={user}/>
					{ loading &&
						<div className="overlay">
							<div className="overlay-modal">
								<h2>Loading...</h2>
								<div className="loader"/>
							</div>
						</div>
					}

				</div>
			</Router>
		)

	}
}

export default connect(state => {
		return {
			user: state.user,
			loading: state.trip.loading
		}
	}
)(App)