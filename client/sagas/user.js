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
	REQUEST_SIGNUP_USER,
	REQUEST_SIGNUP_USER_SUCCESS,
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

export function* watchSignupUser() {
	yield call(takeEvery, REQUEST_SIGNUP_USER, signupUserFlow)
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

export function* signupUserFlow(action) {
	try {
		yield call(userService.requestSignupUser, action.displayName, action.password, action.username)
		yield put({
			type: REQUEST_SIGNUP_USER_SUCCESS,
			displayName: action.displayName,
			username: action.username
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