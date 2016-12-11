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
import FormsyText from 'formsy-material-ui/lib/FormsyText';
import RaisedButton from 'material-ui/RaisedButton';
class Register extends Component {
	constructor(props) {
		super(props)
		this.state = {
			canSubmit: false,
			displayName: '',
			username: '',
			password: '',
			confirmPassword: '',
			confirmPasswordError: ''
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
		if (field === 'confirmPassword' && this.state.password != e.target.value) {
			this.setState({
				canSubmit: false,
				confirmPasswordError: 'Password do not match'
			})
		}
		if (field === 'confirmPassword' && this.state.password === e.target.value) {
			this.setState({
				canSubmit: true,
				confirmPasswordError: ''
			})
		}
	}

	onSignupUser() {
		this.props.handleSignupUser(this.state.displayName, this.state.password, this.state.username)
	}

	render() {
		return (
			<Card className="content-container">
				<CardHeader title="Register" titleColor={Colors.teal400} 
					 			 titleStyle={{'fontWeight': 'bolder'}}
					 			 subtitle="We hope you will get started with this sample registration">
				</CardHeader>
				<CardText >
					<Formsy.Form onValid={this.enableButton.bind(this)}
			            		 onInvalid={this.disableButton.bind(this)}>
						<FormsyText name="displayName" floatingLabelText="Your name" fullWidth={true} value={this.state.displayName} onChange={this.onFieldChanged.bind(this,'displayName')} required />
						<FormsyText name="username" floatingLabelText="Username" fullWidth={true} value={this.state.username} onChange={this.onFieldChanged.bind(this,'username')} required />
						<FormsyText name="password" floatingLabelText="Password" type="password" fullWidth={true} value={this.state.password} onChange={this.onFieldChanged.bind(this,'password')} required />
						<FormsyText name="confirmPassword" floatingLabelText="Confirm Password" type="password" fullWidth={true} 
									value={this.state.confirmPassword} onChange={this.onFieldChanged.bind(this,'confirmPassword')} 
									errorText={this.state.confirmPasswordError}
									required />
						<p></p>
						<RaisedButton type="button" label="REGISTER" primary={true} fullWidth={true}  disabled={!this.state.canSubmit} onClick={this.onSignupUser.bind(this)} />
					</Formsy.Form>

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