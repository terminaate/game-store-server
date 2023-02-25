import { CreateGameDto } from './dtos/create-game.dto';
import { Game, GameDocument, GameEditableFields } from './models/game.model';
import { GamesException } from './games.exception';
import { PatchGameDto } from './dtos/patch-game.dto';
import { isImageUrl } from '@/utils/isImageUrl';
import { Types } from 'mongoose';
import { GameDto } from './dtos/game.dto';
import { RolesService } from '@/roles/roles.service';
import { Exception } from '@/lib/exception';

export class GamesService {
	// TODO
	// Add likes || rating || comments

	static async createGame(createGameDto: CreateGameDto) {
		await this.validateImages(createGameDto.images);
		const newGame = await Game.create(createGameDto);
		return new GameDto(newGame);
	}

	static async getGameById(id: Types.ObjectId): Promise<GameDocument> {
		if (!id || !Types.ObjectId.isValid(id)) {
			throw GamesException.GameNotFound();
		}
		const game = await Game.findById(id);
		if (!game) {
			throw GamesException.GameNotFound();
		}
		return game;
	}

	static async patchGame(
		userId: Types.ObjectId,
		gameId: Types.ObjectId,
		patchGameDto: PatchGameDto
	) {
		const game = await this.getGameById(gameId);
		await this.validatePermissions(game, userId);
		const { images } = patchGameDto;
		if (images) {
			await this.validateImages(images);
		}
		for (const key in patchGameDto) {
			if (GameEditableFields.includes(key) && game[key] !== patchGameDto[key]) {
				game[key] = patchGameDto[key];
			}
		}
		await game.save();
		return new GameDto(game);
	}

	static async deleteGame(userId: Types.ObjectId, gameId: Types.ObjectId) {
		const game = await this.getGameById(gameId);
		await this.validatePermissions(game, userId);
		await game.delete();
		return new GameDto(game);
	}

	static async getAllGames(page: number, pageLimit: number) {
		pageLimit = Math.abs(pageLimit);
		page = Math.abs(page) || 1;
		const games = (
			await Game.find(
				{},
				{},
				{ limit: pageLimit, skip: (page - 1) * pageLimit }
			)
		).map((o) => new GameDto(o));
		const allGamesCount = await Game.countDocuments();
		const totalPages = Math.ceil(allGamesCount / pageLimit) || 1;
		return { totalPages, currentPage: page, games };
	}

	private static async validatePermissions(
		game: GameDocument,
		userId: Types.ObjectId,
		permissions = 100
	) {
		const userPermissions = await RolesService.getUserPermissions(userId);
		if (game.author !== userId && userPermissions <= permissions) {
			throw Exception.ForbiddenException();
		}
	}

	private static async validateImages(images: string[]) {
		for (const image of images) {
			if (!(await isImageUrl(image))) {
				throw GamesException.GameImagesInNotValid();
			}
		}
	}
}
