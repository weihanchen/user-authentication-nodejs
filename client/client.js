import React from 'react'
import {
	render
} from 'react-dom'
import {
	Router,
	browserHistory,
	hashHistory
} from 'react-router'
import {
	Provider
} from 'react-redux'


import routes from './routes.js'
import store from './store/configureStore'

/* Stylesheets*/
import 'font-awesome/scss/font-awesome.scss'
import './stylesheets/style.scss'

render(
	<div>
		<Provider store={store}>
			<Router children={routes} history={hashHistory} />
		</Provider>
	</div>,
	document.getElementById('root')
)