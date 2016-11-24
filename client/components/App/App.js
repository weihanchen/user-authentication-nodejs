import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import * as Colors from 'material-ui/styles/colors';
//import components
import Header from '../Header'
import Body from '../Body'
import Footer from '../Footer'

const muiTheme = getMuiTheme({
	palette: {
		primary1Color: Colors.teal400

	},
});

class App extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
		return (
			<MuiThemeProvider muiTheme={muiTheme} >
				<div>
					<Header />
					<Body children={this.props.children} {...this.props}></Body>
					<Footer />
				</div>
			</MuiThemeProvider>
		)
	}
}

export default App