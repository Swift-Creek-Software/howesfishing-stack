import { createSelector } from 'reselect'

import guidesByIdSelector from './guidesById'

const editingGuideSelector = state => state.guide.editingGuide
const guidesByid = state => guidesByIdSelector(state)

const getEditingGuide = (editingGuide, guides) => guides[editingGuide] || null

export default createSelector(editingGuideSelector, guidesByid, getEditingGuide)