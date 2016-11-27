import {
	watchLogin
} from './login'
import {
	watchAuthentication
} from './authentication'
export default function* rootSaga() {
	yield [
		watchLogin(),
		watchAuthentication()
	]
}