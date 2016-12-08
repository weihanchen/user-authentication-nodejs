import React, {
	Component,
	PropTypes
} from 'react'
import {
	Link
} from 'react-router'
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
	requestCurrentUser,
	requestLogout,
	requestUpdateUser,
	resetLogoutStatus,
	resetUserStatus
} from '../actions'
import ErrorContent from '../components/ErrorContent'
import Profile from '../components/Profile'


class ProfileContainer extends Component {

	constructor(props) {
		super(props)
		this.props.resetLogoutStatus()
		this.props.resetUserStatus()
	}

	componentDidMount() {
		const token = localStorage.getItem('token')
		if (!token) hashHistory.push('/login')
		else this.props.requestCurrentUser(token)
	}

	componentWillReceiveProps(nextProps) {
		const logout_status = nextProps.logout.status
		if (logout_status === 'success') hashHistory.push('/login')
	}

	handleLogout() {
		const token = localStorage.getItem('token')
		this.props.requestLogout(token)
	}


	handleUpdateUser(displayName, uid, username) {
		const token = localStorage.getItem('token')
		const {
			user
		} = this.props
		user.displayName = displayName
		user.uid = uid
		user.username = username
		this.props.requestUpdateUser(token, user)
	}

	render() {
		const {
			user
		} = this.props
		const self = this
		const renderStatus = {
			loading: function() {
				return (<div className="text-center">
							 <CircularProgress size={160} thickness={7} />
						</div>)
			},
			error: function() {
				return (
					<div className="text-center">
					<ErrorContent message={user.error.message} />
					<Link to='/login'>Redirect to login</Link>
				</div>)
			},
			success: function() {
				return (
					<Profile displayName={user.displayName} role={user.role} uid={user.uid} username={user.username} handleUpdateUser={self.handleUpdateUser.bind(self)} handleLogout={self.handleLogout.bind(self)} />
				)
			}
		}
		if (renderStatus.hasOwnProperty(user.status)) return renderStatus[user.status]()
		return (<div></div>)
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.user,
		logout: state.logout
	}
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		requestCurrentUser,
		requestLogout,
		requestUpdateUser,
		resetLogoutStatus,
		resetUserStatus
	}, dispatch)
}

ProfileContainer.propTypes = {
	requestCurrentUser: PropTypes.func,
	requestLogout: PropTypes.func,
	requestUpdateUser: PropTypes.func,
	resetLogoutStatus: PropTypes.func,
	resetUserStatus: PropTypes.func,
	user: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer)