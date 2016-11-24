import React from 'react'
import {
	Redirect,
	Route,
	IndexRoute,
	hashHistory,
	browserHistory
} from 'react-router'

//import components
import App from './components/App'
import Register from './components/Register'

import {
	LoginContainer
} from './containers'

const Routes = (
	<Route path='/' component={App}>
		<IndexRoute component={LoginContainer} />
		<Route path='/login' component={LoginContainer} />
		<Route path='/register' component={Register} />
	</Route>
)

export default Routes