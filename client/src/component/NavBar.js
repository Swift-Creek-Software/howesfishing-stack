import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { logout } from '../actions/UserActions'

import ListItemLink from './ListItemLink'


class NavBar extends PureComponent {
	static propsTypes = {
		clearUser: PropTypes.func.isRequired
	}

	onLogoutClick = (event) => {
		event.preventDefault()
		this.props.logout()
	}

	renderNavItems = () => {
		if (!this.props.user.isLoggedIn) {
			return null
		}
		if (this.props.user.isAdmin) {
			return (
				<Nav>
					<ListItemLink to="/dashboard">Dashboard</ListItemLink>
					<ListItemLink to="/guides">Guides</ListItemLink>
					<ListItemLink to="/trip">Add Trip</ListItemLink>
				</Nav>
			)
		} else {
			return (
				<Nav>
					<ListItemLink to="/dashboard">Dashboard</ListItemLink>

				</Nav>
			)
		}

	}

	renderRightNav = () => {
		if(this.props.user.isLoggedIn) {
			return (
				<Nav pullRight>
					{true &&
					<ListItemLink to="/password">Password Change</ListItemLink>
					}
					<NavItem eventKey={1} onClick={this.onLogoutClick}>Logout</NavItem>
				</Nav>
			)
		} else {
			return (
				<Nav pullRight>
					<ListItemLink to="/login">Login</ListItemLink>
				</Nav>
			)
		}
	}

	render() {
		return (
			<Navbar collapseOnSelect>
				<Navbar.Header>
					<Navbar.Brand>
						<a href="#">Howe's Fishing Admin</a>
					</Navbar.Brand>
					<Navbar.Toggle />
				</Navbar.Header>
				<Navbar.Collapse>
					{this.renderNavItems()}
					{this.renderRightNav()}
				</Navbar.Collapse>
			</Navbar>
		)
	}
}

export default connect(state => {
		return {
			user: state.user
		}
	},
	{ logout }
)(withRouter(NavBar))