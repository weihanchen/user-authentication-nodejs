import React from 'react'
import {
	Redirect,
	Route,
	IndexRoute
} from 'react-router'

//import components
import App from './components/App'
import Register from './components/Register'

import {
	AuthContainer,
	LoginContainer,
	ProfileContainer
} from './containers'

const Routes = (
	<Route path='/' component={App}>
		<IndexRoute component={AuthContainer} />
		<Route path='/auth' component={AuthContainer} />
		<Route path='/login' component={LoginContainer} />
		<Route path='/profile' component={ProfileContainer} />
		<Route path='/register' component={Register} />
	</Route>
)

export default Routes