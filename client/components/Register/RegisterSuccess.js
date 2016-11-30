import React, {
	Component,
	PropTypes
} from 'react'
import {
	Link
} from 'react-router'


class RegisterSuccess extends Component {
	render() {
		const {
			displayName,
			username
		} = this.props
		return (
			<div className="text-center">
				<span className="text-success"><i className="fa fa-check fa-5x" aria-hidden="true"></i></span>
				<p></p>
				<h3 className="text-success">Signup Success</h3>
				<p></p>
				<h4>Your displayName: {displayName}</h4>
				<h4>Your username: {username}</h4>
				<hr/>
				<Link to={'/login'} >I want to login now!</Link>
			</div>
		)
	}
}

RegisterSuccess.propTypes = {
	displayName: PropTypes.string,
	username: PropTypes.string
}

export default RegisterSuccess