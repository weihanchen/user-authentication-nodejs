import React from 'react'
import AppBar from 'material-ui/AppBar';
class Footer extends React.Component {
	render() {
		return (
			<nav className="navbar navbar-default navbar-fixed-bottom footer">
				<div className="container-fluid text-center footer-text">
					<a href="https://github.com/weihanchen/user-authentication-nodejs" target="_blank">User-authentication-nodejs</a>  is maintained by  <a href="https://github.com/weihanchen"  target="_blank">weihanchen</a>
				</div>
			</nav>
		)
	}
}

export default Footer