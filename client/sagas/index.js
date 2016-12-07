import {
	watchLogin
} from './login'
import {
	watchLogout
} from './logout'
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
		watchLogout(),
		watchSignupUser(),
		watchUpdateUser()
	]
}