import { Exception } from '../lib/exception';

export class GamesExceptions extends Exception {
	static GameNotFound() {
		return super.NewException('Game with this id is not found.', 404);
	}

	static GameImagesInNotValid() {
		return super.NewException('Game images is not array of image urls!', 400);
	}
}
