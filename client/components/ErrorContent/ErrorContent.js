import React, {
	Component,
	PropTypes
} from 'react'
import {
	Link
} from 'react-router'

class ErrorContent extends Component {
	handleLinkClick(e) {
		window.location.reload()
	}

	render() {
		const {
			message,
			locationPath
		} = this.props
		return (
			<div className="text-center">
				<span className="text-danger"><i className="fa fa-frown-o fa-5x" aria-hidden="true"></i></span>
				<p></p>
				<h3 className="text-danger">Oh Snap!</h3>
				<p></p>
				<h4>{message}</h4>
				<hr/>
				<a href='javascript:void(0)' onClick={this.handleLinkClick.bind(this)}>Try it again?</a>
			</div>
		)
	}
}

ErrorContent.propTypes = {
	message: PropTypes.string
}

export default ErrorContent