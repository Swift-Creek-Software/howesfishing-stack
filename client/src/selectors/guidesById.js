import { createSelector } from 'reselect'

const guides = state => state.guide.guides


const getGuidesById = (guides) => {
	return guides.reduce((acc, current) => {
		acc[current.id] = current
		return acc
	}, {})
}

export default createSelector(guides, getGuidesById)