import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import GuideRow from './GuideRow'
import './Guides.css'


class Guides extends PureComponent {
	static propsTypes = {
		guides: PropTypes.array.isRequired
	}

	renderGuideRows = () => {
		return this.props.guides.map(guide => {
			return (
				<GuideRow guide={guide} key={`guide-${guide.id}`}/>
			)
		})
	}

	render() {
		return (
			<div className="Guides">
				<div className="header-wrapper">
					<h1>Guides</h1>
					<Link to="/admin/guide" className="btn btn-primary">+Add Guide</Link>
				</div>
				<Table responsive hover condensed>
					<thead>
					<tr>
						<th>Name</th>
						<th>Phones</th>
						<th>Emails</th>
					</tr>
					</thead>
					<tbody>
					{this.renderGuideRows()}
					</tbody>
				</Table>
			</div>
		)
	}
}
export default connect(state => {
	return {
		guides: state.guide.guides
	}
})(Guides)