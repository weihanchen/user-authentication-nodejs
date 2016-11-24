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
} from 'material-ui/Card'
import * as Colors from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
class Register extends Component {
	render() {
		return (
			<Card className="content-container">
				<CardHeader title="Register" titleColor={Colors.teal400} 
					 			 titleStyle={{'font-weight': 'bolder'}}
					 			 subtitle="We hope you will get started with this sample registration">
				</CardHeader>
				<CardText >
					<TextField floatingLabelText="Your name"  fullWidth="true"/>
	    			<TextField floatingLabelText="Username" fullWidth="true" />
	    			<TextField floatingLabelText="Password" type="password" fullWidth="true" />
	    			<TextField floatingLabelText="Confirm Password" type="password" fullWidth="true" />
	    			<p></p>
	    			<RaisedButton label="REGISTER" primary={true} fullWidth={true} />
	    			<br/>
	    			<br/>
	    			<Link to={'/login'} >Member Login</Link>
				  </CardText>
			</Card>
		)
	}
}

export default Register