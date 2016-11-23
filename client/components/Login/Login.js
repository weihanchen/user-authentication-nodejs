import React, {
	Component
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
} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class Login extends Component {
	render() {
		return (
			<div>
				<Card className="content-container">
					 <CardHeader title="Login" titleColor="rgb(0, 188, 212)" 
					 			 titleStyle={{'font-weight': 'bolder'}}
					 			 subtitle="After login success will response json web token and we can store this token in front-end.If don't have account you can access below.">
					 </CardHeader>
					 <CardText >
				     	<TextField floatingLabelText="Username"  fullWidth="true"/>
    					<TextField floatingLabelText="Password" type="password" fullWidth="true" />
    					<p></p>
    					<RaisedButton label="Login" primary={true} fullWidth={true} />
    					<br/>
    					<br/>
    					<Link to={'/register'} >Not a member?Sign up now</Link>
				    </CardText>
				</Card>
			</div>
		)
	}
}

export default Login