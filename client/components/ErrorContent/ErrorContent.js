import React, {
	Component,
	PropTypes
} from 'react'
import {
	hashHistory
} from 'react-router'

class ErrorContent extends Component {
	handleLinkClick(e) {
		window.location.reload()
	}

	handleLoginClick() {
		hashHistory.push('/login')
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
				<a href="javascript:void(0)" onClick={this.handleLoginClick.bind(this)}>Redirect to Login?</a>
				<br/>
				<a href='javascript:void(0)' onClick={this.handleLinkClick.bind(this)}>Or try it again?</a>
			</div>
		)
	}
}

ErrorContent.propTypes = {
	message: PropTypes.string
}

export default ErrorContent