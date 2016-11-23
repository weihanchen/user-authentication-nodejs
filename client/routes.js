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

const Routes = (
	<Route path='/' component={App}>
		<IndexRoute component={Login} />
		<Route path="/login" component={Login} />
	</Route>
)

export default Routes