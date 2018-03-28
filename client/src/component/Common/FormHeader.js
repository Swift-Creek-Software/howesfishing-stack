import React, { PureComponent } from 'react'

class FormHeader extends PureComponent {

	render() {
		return (
			<div className="panel-heading">
				<h3 className="panel-title">
					{this.props.children}
				</h3>
			</div>
		)
	}
}

export default FormHeader