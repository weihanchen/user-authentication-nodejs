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

	onFieldChanged(field, e) {
		const updateObject = {}
		updateObject[field] = e.target.value
		this.setState(updateObject)
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
				<CardText>
					<TextField floatingLabelText="DisplayName" fullWidth={true} value={this.state.displayName} onChange={this.onFieldChanged.bind(this,'displayName')} />
					<TextField floatingLabelText="Username" fullWidth={true} value={this.state.username} onChange={this.onFieldChanged.bind(this,'username')} />
					<TextField floatingLabelText="Role" fullWidth={true} value={this.state.role} disabled={true} />
					<p></p>
					<TextField floatingLabelText="UID" fullWidth={true} disabled={true} value={this.state.uid} ></TextField>
					<hr/>
					
				</CardText>
				 <CardActions>
				      <RaisedButton label="Update" primary={true} onClick={this.onUpdateClicked.bind(this)} />
					<RaisedButton label="Logout" primary={true} />
    			</CardActions>
			</Card>
		)
	}
}

export default Profile

Profile.propTypes = {
	displayName: PropTypes.string,
	handleUpdateUser: PropTypes.func,
	role: PropTypes.string,
	status: PropTypes.string,
	uid: PropTypes.string,
	username: PropTypes.string
}