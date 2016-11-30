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
import * as Colors from 'material-ui/styles/colors'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'



class Login extends Component {
	constructor(props) {
		super(props)
		this.state = {
			password: '',
			passwordErrorText: 'Password is required.',
			username: '',
			usernameErrorText: 'Username is required.',
			loginDisabled: true
		}
	}

	onLoginClicked() {
		const {
			handleLogin
		} = this.props
		const username = this.state.username
		const password = this.state.password
		handleLogin(username, password)
	}

	onPasswordChanged(e) {
		const password = e.target.value;
		const passwordErrorText = password.length > 0 ? null : 'Password is required.'
		const loginDisabled = passwordErrorText != null || this.state.usernameErrorText != null
		this.setState({
			password: e.target.value,
			passwordErrorText: passwordErrorText,
			loginDisabled: loginDisabled
		})
	}

	onUsernameChanged(e) {
		const username = e.target.value
		const usernameErrorText = username.length > 0 ? null : 'Username is required.'
		const loginDisabled = usernameErrorText != null || this.state.passwordErrorText != null
		this.setState({
			username: username,
			usernameErrorText: usernameErrorText,
			loginDisabled: loginDisabled
		})
	}

	render() {
		return (
			<Card className="content-container">
				<CardHeader title="Login" titleColor={Colors.teal400} 
					 			 titleStyle={{'fontWeight': 'bolder'}}
					 			 subtitle="After login success will response json web token and we can store this token in front-end.If don't have account you can access below or you can try guest accunt [guest] password [guest]">
				</CardHeader>
				<CardText >
					<TextField floatingLabelText="Username"  fullWidth={true} value={this.state.username} onChange={this.onUsernameChanged.bind(this)} errorText={this.state.usernameErrorText} />
	    			<TextField floatingLabelText="Password" type="password" fullWidth={true}  value={this.state.password} onChange={this.onPasswordChanged.bind(this)} errorText={this.state.passwordErrorText} />
	    			<p></p>
	    			<RaisedButton label="Login" primary={true} fullWidth={true} onClick={this.onLoginClicked.bind(this)} disabled={this.state.loginDisabled} />
	    			<br/>
	    			<br/>
	    			<Link to={'/register'} >Not a member?Sign up now</Link>
				  </CardText>
			</Card>
		)
	}
}

Login.propTypes = {
	handleLogin: PropTypes.func
}

export default Login