import { CreateGameDto } from './dtos/create-game.dto';
import { Game, GameDocument, GameSchema } from './models/game.model';
import { GamesExceptions } from './games.exceptions';
import { PatchGameDto } from './dtos/patch-game.dto';
import { isImageUrl } from '../utils/isImageUrl';
import { Types } from 'mongoose';
import { GameDto } from './dtos/game.dto';

export class GamesService {
	private static async validateImages(images: string[]) {
		for (const image of images) {
			if (!(await isImageUrl(image))) {
				throw GamesExceptions.GameImagesInNotValid();
			}
		}
	}

	static async createGame(createGameDto: CreateGameDto) {
		await this.validateImages(createGameDto.images);
		const newGame = await Game.create(createGameDto);
		return new GameDto(newGame);
	}

	static async getGameById(id: string): Promise<GameDocument> {
		if (!id || !Types.ObjectId.isValid(id)) {
			throw GamesExceptions.GameNotFound();
		}
		const game = await Game.findById(id);
		if (!game) {
			throw GamesExceptions.GameNotFound();
		}
		return game;
	}

	static async patchGame(gameId: string, patchGameDto: PatchGameDto) {
		const game = await this.getGameById(gameId);
		const { images } = patchGameDto;
		if (images) {
			await this.validateImages(images);
		}
		for (const key in patchGameDto) {
			if (
				GameSchema.pathType(key) === 'real' &&
				game.get(key) !== patchGameDto[key]
			) {
				game.set(key, patchGameDto[key]);
			}
		}
		await game.save();
		return new GameDto(game);
	}

	static async deleteGame(gameId: string) {
		const game = await this.getGameById(gameId);
		await game.delete();
		return new GameDto(game);
	}

	static async getAllGames() {
		const allGames = await Game.find();
		return allGames.map((o) => new GameDto(o));
	}
}
