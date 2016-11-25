import React, {
	Component,
	PropTypes
} from 'react'
import {
	connect
} from 'react-redux'
import {
	bindActionCreators
} from 'redux';
import {
	requestLogin
} from '../actions'
//components
import Login from '../components/Login'

class LoginContainer extends Component {

	handleLogin(username, password) {
		this.props.requestLogin(username, password)
	}

	render() {
		const {
			login
		} = this.props
		return (
			<Login errorContent={login.error} status={login.status} handleLogin={this.handleLogin.bind(this)} />
		)
	}
}

const mapStateToProps = (state) => {
	return {
		login: state.login
	}
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		requestLogin
	}, dispatch)
}

LoginContainer.propTypes = {
	requestLogin: PropTypes.func,
	login: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)