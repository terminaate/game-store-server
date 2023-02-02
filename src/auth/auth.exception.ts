import { Exception } from '../lib/exception';

class AuthException extends Exception {
	static UserNotExist() {
		return super.NewException('User is not exist.', 400);
	}
}
