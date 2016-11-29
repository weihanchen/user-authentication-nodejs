import React, {
	Component,
	PropTypes
} from 'react'
import {
	connect
} from 'react-redux'
import {
	bindActionCreators
} from 'redux'
import {
	hashHistory
} from 'react-router'
import CircularProgress from 'material-ui/CircularProgress';
import {
	requestSignupUser
} from '../actions'
import ErrorContent from '../components/ErrorContent'
import Register from '../components/Register'


class RegisterContainer extends Component {

	handleSignupUser(displayName, password, username) {
		this.props.requestSignupUser(displayName, password, username)
	}

	render() {
		const {
			user
		} = this.props
		const renderStatus = {
			loading: function() {
				return (<div className="text-center">
							 <CircularProgress size={160} thickness={7} />
						</div>)
			},
			error: function() {
				return <ErrorContent message={user.error} />
			}
		}
		if (renderStatus.hasOwnProperty(user.status)) return renderStatus[user.status]()
		return (<Register handleSignupUser={this.handleSignupUser.bind(this)} />)
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.user
	}
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		requestSignupUser
	}, dispatch)
}

RegisterContainer.propTypes = {
	requestSignupUser: PropTypes.func,
	user: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer)