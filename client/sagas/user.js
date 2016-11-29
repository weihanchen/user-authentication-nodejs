import {
	takeEvery
} from 'redux-saga'

import {
	put,
	call
} from 'redux-saga/effects'

import {
	REQUEST_CURRENTUSER,
	REQUEST_CURRENTUSER_SUCCESS,
	REQUEST_FAILD,
	REQUEST_UPDATEUSER,
	REQUEST_UPDATEUSER_SUCCESS
} from '../actions'

import {
	AuthService,
	UserService
} from '../api'
const userService = new UserService()
export function* watchCurrentUser() {
	yield call(takeEvery, REQUEST_CURRENTUSER, currentUserFlow)
}

export function* watchUpdateUser() {
	yield call(takeEvery, REQUEST_UPDATEUSER, updateUserFlow)
}

export function* currentUserFlow(action) {
	try {
		const user = yield call(userService.requestCurrentUser, action.token)
		yield put({
			type: REQUEST_CURRENTUSER_SUCCESS,
			user
		})
	} catch (error) {
		yield put({
			type: REQUEST_FAILD,
			error
		})
	}
}

export function* updateUserFlow(action) {
	try {
		const result = yield call(userService.requestUpdateUser, action.token, action.user)
		const user = Object.assign(action.user, result)
		yield put({
			type: REQUEST_UPDATEUSER_SUCCESS,
			user
		})
	} catch (error) {
		yield put({
			type: REQUEST_FAILD,
			error
		})
	}
}