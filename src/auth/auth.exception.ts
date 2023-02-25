import { Exception } from '@/lib/exception';

export class AuthException extends Exception {
	static UserAlreadyExist() {
		return new AuthException('User with this username already exist.', 400);
	}

	static WrongAuthData() {
		return new AuthException('Wrong username or password.', 400);
	}
}
