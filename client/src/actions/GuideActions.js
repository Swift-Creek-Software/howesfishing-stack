export const actionTypes = {
	addGuide: 'ADD_GUIDE',
	addGuideSuccess: 'ADD_GUIDE_SUCCESS',
	deleteGuide: 'DELETE_GUIDE',
	fetchGuides: 'FETCH_GUIDES',
	fetchGuidesSuccess: 'FETCH_GUIDES_SUCCESS',
	setCurrentGuide: 'SET_CURRENT_GUIDE',
	setEditingGuide: 'SET_EDITING_GUIDE',
	updateGuide: 'UPDATE_GUIDE'
}

export const setCurrentGuide = (id = null) => {
	return {
		type: actionTypes.setCurrentGuide,
		payload: id
	}
}

export const fetchGuides = () => {
	return {
		type: actionTypes.fetchGuides,
		payload: {
      client: 'base',
			request: {
				url: 'api/guides',
			}
		}
	}
}

export const addGuide = (data) => {
	return {
		type: actionTypes.addGuide,
		payload: {
      client: 'base',
			request: {
				url: 'api/guides',
				method: 'post',
				data
			}
		}
	}
}

export const updateGuide = (data) => {
	return {
		type: actionTypes.updateGuide,
		payload: {
      client: 'base',
			request: {
				url: `api/guides/${data.id}`,
				method: 'put',
				data
			}
		}
	}
}

export const deleteGuide = (id) => {
	return {
		type: actionTypes.deleteGuide,
		payload: {
      client: 'base',
			request: {
				url: `api/guides/${id}`,
				method: 'delete',
			},
			id

		}
	}
}

export const setEditingGuide = (id = null) => {
	return {
		type: actionTypes.setEditingGuide,
		payload: id
	}
}