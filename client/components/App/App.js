import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
//import components
import Header from '../Header'
import Body from '../Body'
import Footer from '../Footer'

class App extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
		return (
			<MuiThemeProvider>
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