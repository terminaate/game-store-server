import { Exception } from '@/lib/exception';

export class UsersException extends Exception {
	static UserIdIsNotExist() {
		return new UsersException("User with this id isn't exist.", 404);
	}

	static UserAlreadyExist() {
		return new UsersException('User with this username already exist.', 400);
	}

	static AvatarIsNotImage() {
		return new UsersException('Avatar url is not response an image.', 400);
	}

	static CartGamesIdsIsNotFound() {
		return new UsersException(
			'Not found a game with id that includes in cart',
			404
		);
	}
}
