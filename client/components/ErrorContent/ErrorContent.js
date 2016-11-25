import React, {
	Component,
	PropTypes
} from 'react'


class ErrorContent extends Component {
	render() {
		const {
			message
		} = this.props
		return (
			<div className="text-center">
				<span className="text-danger"><i className="fa fa-frown-o fa-large" aria-hidden="true"></i></span>
				<p></p>
				<h3 className="text-danger">Oh Snap!</h3>
				<p></p>
				<h4>{message}</h4>
			</div>
		)
	}
}

ErrorContent.propTypes = {
	message: PropTypes.string
}

export default ErrorContent