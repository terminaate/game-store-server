import { Exception } from '../lib/exception';

export class UsersExceptions extends Exception {
	static UserIdIsNotExist() {
		return super.NewException("User with this id isn't exist.", 404);
	}

	static UserAlreadyExist() {
		return super.NewException('User with this username already exist.', 400);
	}

	static AvatarIsNotImage() {
		return super.NewException('Avatar url is not response an image.', 400);
	}
}
