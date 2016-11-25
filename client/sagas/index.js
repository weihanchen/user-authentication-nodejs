import {
	watchLogin
} from './login'
export default function* rootSaga() {
	yield [
		watchLogin()
	]
}