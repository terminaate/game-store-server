import { Exception } from '../lib/exception';

export class AuthExceptions extends Exception {
	static UserAlreadyExist() {
		return super.NewException('User with this username already exist.', 400);
	}

	static WrongAuthData() {
		return super.NewException('Wrong username or password.', 400);
	}
}
