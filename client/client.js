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
import injectTapEventPlugin from 'react-tap-event-plugin';

import routes from './routes.js'
import store from './store/configureStore'

/* Stylesheets*/
import 'bootstrap-sass/assets/stylesheets/_bootstrap.scss'
import 'font-awesome/scss/font-awesome.scss'
import './stylesheets/style.scss'
injectTapEventPlugin();

render(
	<div>
		<Provider store={store}>
			<Router children={routes} history={hashHistory} />
		</Provider>
	</div>,
	document.getElementById('root')
)