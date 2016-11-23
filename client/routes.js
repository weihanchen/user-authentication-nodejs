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
import Login from './components/Login'
import Register from './components/Register'

const Routes = (
	<Route path='/' component={App}>
		<IndexRoute component={Login} />
		<Route path='/login' component={Login} />
		<Route path='register' component={Register} />
	</Route>
)

export default Routes