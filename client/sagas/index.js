import {
	watchLogin
} from './login'
import {
	watchAuthentication
} from './authentication'
import {
	watchCurrentUser,
	watchSignupUser,
	watchUpdateUser
} from './user'
export default function* rootSaga() {
	yield [
		watchAuthentication(),
		watchCurrentUser(),
		watchLogin(),
		watchSignupUser(),
		watchUpdateUser()
	]
}