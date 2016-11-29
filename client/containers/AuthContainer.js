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
import LinearProgress from 'material-ui/LinearProgress';
import {
	requestAuthentication
} from '../actions'

class AuthContainer extends Component {

	componentDidMount() {
		const token = localStorage.getItem('token')
		if (!token) hashHistory.push('/login')
		else this.props.requestAuthentication(token)
	}

	componentWillReceiveProps(nextProps) {
		const status = nextProps.authentication.status
		const statusFunction = {
			'success': function() {
				hashHistory.push('/profile')
			},
			'error': function() {
				hashHistory.push('/login')
			}
		}
		if (statusFunction.hasOwnProperty(status)) statusFunction[status]()
	}

	render() {
		return (
			<LinearProgress mode="indeterminate" />
		)
	}
}

const mapStateToProps = (state) => {
	return {
		authentication: state.authentication
	}
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		requestAuthentication
	}, dispatch)
}

AuthContainer.propTypes = {
	requestAuthentication: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer)