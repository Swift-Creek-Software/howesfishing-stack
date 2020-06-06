import { logout } from '../actions/UserActions'
import { endsWith } from 'lodash'

export default function ({ dispatch }) {
	return next => action => {

		const { type } = action

		if (endsWith(type, '_FAIL')) {
			const status = action.error && action.error.response && action.error.response.status
			if (status === 401) {
				// dispatch(logout())

				return
			}
			return next(action)
		}
		return next(action)
	}
}