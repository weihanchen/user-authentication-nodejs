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
	requestCurrentUser
} from '../actions'
import ErrorContent from '../components/ErrorContent'
import Profile from '../components/Profile'


class ProfileContainer extends Component {

	componentDidMount() {
		const token = localStorage.getItem('token')
		if (!token) hashHistory.push('/login')
		else this.props.requestCurrentUser(token)
	}

	handleUpdateUser(displayName, role, uid, username) {

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
				return <ErrorContent message={user.error} />
			},
			success: function() {
				return (
					<Profile displayName={user.displayName} role={user.role} uid={user.uid} username={user.username} handleUpdateUser={self.handleUpdateUser.bind(self)} />
				)
			}
		}
		if (renderStatus.hasOwnProperty(user.status)) return renderStatus[user.status]()
		return (<div></div>)
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.user
	}
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		requestCurrentUser
	}, dispatch)
}

ProfileContainer.propTypes = {
	requestCurrentUser: PropTypes.func,
	user: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer)