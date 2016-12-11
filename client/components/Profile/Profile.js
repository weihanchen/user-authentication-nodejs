import React, {
	Component,
	PropTypes
} from 'react'
import {
	Link
} from 'react-router'
//components
import {
	Card,
	CardActions,
	CardHeader,
	CardMedia,
	CardTitle,
	CardText
} from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import FormsyText from 'formsy-material-ui/lib/FormsyText';
import * as Colors from 'material-ui/styles/colors'

class Profile extends Component {
	constructor(props) {
		super(props)
		const {
			displayName,
			role,
			uid,
			username
		} = this.props
		this.state = {
			displayName: displayName,
			role: role,
			uid: uid,
			username: username
		}
	}

	enableButton() {
		this.setState({
			canSubmit: true
		})
	}

	disableButton() {
		this.setState({
			canSubmit: false
		})
	}

	onFieldChanged(field, e) {
		const updateObject = {}
		updateObject[field] = e.target.value
		this.setState(updateObject)
	}

	onLogoutClicked() {
		const {
			handleLogout
		} = this.props
		handleLogout()
	}

	onUpdateClicked() {
		const {
			handleUpdateUser
		} = this.props
		handleUpdateUser(this.state.displayName, this.state.uid, this.state.username)
	}

	render() {

		return (
			<Card className='content-container'>
				<CardHeader title={`Hello ${this.state.displayName}`} titleColor={Colors.teal400} titleStyle={{'fontWeight': 'bolder'}} ></CardHeader>
				<Formsy.Form onValid={this.enableButton.bind(this)}
			            	 onInvalid={this.disableButton.bind(this)}>
					<CardText>
						<FormsyText name="displayName" floatingLabelText="DisplayName" fullWidth={true} value={this.state.displayName} onChange={this.onFieldChanged.bind(this,'displayName')} required />
						<FormsyText name="username" floatingLabelText="Username" fullWidth={true} value={this.state.username} onChange={this.onFieldChanged.bind(this,'username')} required />
						<TextField name="role" floatingLabelText="Role" fullWidth={true} value={this.state.role} disabled={true} />
						<p></p>
						<TextField name="uid" floatingLabelText="UID" fullWidth={true} disabled={true} value={this.state.uid} ></TextField>
						<hr/>
					</CardText>
				 	<CardActions>
					     <RaisedButton type="button" label="Update" primary={true} onClick={this.onUpdateClicked.bind(this)} disabled={!this.state.canSubmit} />
						 <RaisedButton type="button" label="Logout" primary={true} onClick={this.onLogoutClicked.bind(this)} />
    				</CardActions>
				</Formsy.Form>
			</Card>
		)
	}
}

export default Profile

Profile.propTypes = {
	displayName: PropTypes.string,
	handleLogout: PropTypes.func,
	handleUpdateUser: PropTypes.func,
	role: PropTypes.string,
	status: PropTypes.string,
	uid: PropTypes.string,
	username: PropTypes.string
}