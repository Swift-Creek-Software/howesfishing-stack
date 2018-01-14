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
			request: {
				url: '/guide',
			}
		}
	}
}

export const addGuide = (data) => {
	return {
		type: actionTypes.addGuide,
		payload: {
			request: {
				url: '/guide',
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
			request: {
				url: `/guide/${data.id}`,
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
			request: {
				url: `/guide/${id}`,
				method: 'put',
				data: {
					deleted: true
				}
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