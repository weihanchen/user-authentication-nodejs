import {
	takeEvery
} from 'redux-saga'

import {
	put,
	call
} from 'redux-saga/effects'

import {
	REQUEST_CURRENTUSER,
	REQUEST_CURRENTUSER_FAILD,
	REQUEST_CURRENTUSER_SUCCESS
} from '../actions'

import {
	AuthService,
	UserService
} from '../api'

export function* watchCurrentUser() {
	yield call(takeEvery, REQUEST_CURRENTUSER, currentUserFlow)
}

export function* currentUserFlow(action) {
	try {
		const userService = new UserService()
		const user = yield call(userService.requestCurrentUser, action.token)
		yield put({
			type: REQUEST_CURRENTUSER_SUCCESS,
			user
		})
	} catch (error) {
		yield put({
			type: REQUEST_CURRENTUSER_FAILD,
			error
		})
	}
}