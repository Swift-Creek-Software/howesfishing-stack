import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { setEditingGuide } from '../../actions/GuideActions'

import './GuideRow.css'

class GuideRow extends Component {
	static propsTypes = {
		guide: PropTypes.object.isRequired
	}

	render() {
		return (
			<tr className="GuideRow" onClick={() => {
				this.props.setEditingGuide(this.props.guide.id)
				this.props.history.push(`/guide?editing`)
			}}>
				<td>{this.props.guide.name}</td>
				<td className="condensed">{this.props.guide.phones.join(', ')}</td>
				<td className="condensed">{this.props.guide.emails.join(', ')}</td>
			</tr>
		)
	}

}

GuideRow = connect(
	null,
	{ setEditingGuide }
)(GuideRow)
export default withRouter(GuideRow)