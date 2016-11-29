import React, {
	Component,
	PropTypes
} from 'react'
import {
	Link
} from 'react-router'
import {
	Card,
	CardActions,
	CardHeader,
	CardMedia,
	CardTitle,
	CardText
} from 'material-ui/Card'
import * as Colors from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
class Register extends Component {
	constructor(props) {
		super(props)
		this.state = {
			displayName: '',
			username: '',
			password: '',
			confirmPassword: ''
		}
	}
	onSignupUser() {

	}

	render() {
		return (
			<Card className="content-container">
				<CardHeader title="Register" titleColor={Colors.teal400} 
					 			 titleStyle={{'fontWeight': 'bolder'}}
					 			 subtitle="We hope you will get started with this sample registration">
				</CardHeader>
				<CardText >
					<TextField floatingLabelText="Your name"  fullWidth={true} value={this.state.displayName} />
	    			<TextField floatingLabelText="Username" fullWidth={true} value={this.state.username} />
	    			<TextField floatingLabelText="Password" type="password" fullWidth={true} value={this.state.password} />
	    			<TextField floatingLabelText="Confirm Password" type="password" fullWidth={true} value={this.state.confirmPassword} />
	    			<p></p>
	    			<RaisedButton label="REGISTER" primary={true} fullWidth={true} onClick={this.onSignupUser.bind(this)} />
	    			<br/>
	    			<br/>
	    			<Link to={'/login'} >Member Login</Link>
				  </CardText>
			</Card>
		)
	}
}

Register.propTypes = {
	handleSignupUser: PropTypes.func
}

export default Register