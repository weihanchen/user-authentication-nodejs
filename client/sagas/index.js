import {
	watchLogin
} from './login'
import {
	watchAuthentication
} from './authentication'
import {
	watchCurrentUser
} from './user'
export default function* rootSaga() {
	yield [
		watchAuthentication(),
		watchCurrentUser(),
		watchLogin()
	]
}