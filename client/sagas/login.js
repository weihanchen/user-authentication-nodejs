import {
	takeEvery
} from 'redux-saga'

import {
	put,
	call
} from 'redux-saga/effects'

import {
	REQUEST_LOGIN,
	REQUEST_LOGIN_FAILD,
	REQUEST_LOGIN_SUCCESS
} from '../actions'

export function* watchLogin() {
	yield call(takeEvery, REQUEST_LOGIN, loginFlow)
}

export function* loginFlow(action) {
	try {


	} catch (error) {
		yield put({
			type: REQUEST_LOGIN_FAILD,
			error
		})
	}
}