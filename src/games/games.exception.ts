import { Exception } from '@/lib/exception';

export class GamesException extends Exception {
	static GameNotFound() {
		return new GamesException('Game with this id is not found.', 404);
	}

	static GameImagesInNotValid() {
		return new GamesException('Game images is not array of image urls!', 400);
	}
}
