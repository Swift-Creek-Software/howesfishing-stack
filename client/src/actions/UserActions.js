import { fetchTrips, setLoading } from './TripActions'
import { fetchGuides, setCurrentGuide } from './GuideActions'
import { fetchLocations } from './LocationActions'

export const actionTypes = {
	login: 'LOGIN',
	addUser: 'ADD_USER',
	changePassword: 'CHANGE_PASSWORD',
	deleteUser: 'DELETE_USER',
	loginSuccess: 'LOGIN_SUCCESS',
	logout: 'LOG_OUT',
	setUserLoggedIn: 'SET_USER_LOGGED_IN',
	setUserFromState: 'SET_USER_FROM_STATE'
}

export const login = (email, password) => {
	return {
		type: actionTypes.login,
		payload: {
			request: {
				url: '/auth',
				method: 'post',
				data: {
					email,
					password
				}
			}
		}
	}
}

export const setUserLoggedIn = () => {
	return {
		type: actionTypes.setUserLoggedIn
	}
}

export const userLogin = (email, password) => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			dispatch(setLoading(true))
			dispatch(login(email, password)).then((response) => {
				const user = response.payload.data.user

				if (!user.isAdmin) {
					dispatch(setCurrentGuide(user.guideId))
				}
				localStorage.setItem('user', JSON.stringify({ ...user, token: response.payload.data.token }))
				setTimeout(() => {
					Promise.all([
						dispatch(fetchGuides()),
						dispatch(fetchTrips()),
						dispatch(fetchLocations()),
					]).then(() => {
						dispatch(setUserLoggedIn())
						dispatch(setLoading())
						resolve()
					})
				}, 500)

			}).catch(() =>{
				dispatch(setLoading())
				reject()
			})
		})
	}
}

export const fetchDataWithUser = (user) => {
	return dispatch => {
		dispatch(setLoading(true))
		dispatch(setUserFromState(user))

		setTimeout(() => {
			if (!user.isAdmin) {
				dispatch(setCurrentGuide(user.guideId))
			}
			Promise.all([
				dispatch(fetchGuides()),
				dispatch(fetchTrips()),
				dispatch(fetchLocations()),
			]).then(() => {
				dispatch(setUserLoggedIn())
				dispatch(setLoading())
			})
		}, 100)
	}
}

export const setUserFromState = (user) => {
	return {
		type: actionTypes.setUserFromState,
		payload: user
	}
}


export const logout = () => {
	localStorage.removeItem('user')

	return {
		type: actionTypes.logout
	}
}

export const addUser = (data) => {
	return {
		type: actionTypes.addUser,
		payload: {
			request: {
				url: '/user',
				method: 'post',
				data
			}
		}
	}
}

export const changePassword = (data) => {
	return {
		type: actionTypes.changePassword,
		payload: {
			request: {
				url: `/user/${data.id}`,
				method: 'put',
				data
			}
		}
	}
}
export const deleteUser = (id) => {
	return {
		type: actionTypes.deleteUser,
		payload: {
			request: {
				url: `/user/${id}`,
				method: 'put',
				data: {
					deleted: true
				}
			}
		}
	}
}