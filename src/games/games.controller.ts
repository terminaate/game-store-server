import { Controller } from '@/lib/controller';
import { authMiddleware } from '@/middlewares/auth.middleware';
import { validationMiddleware } from '@/middlewares/validation.middleware';
import { CreateGameDto } from './dtos/create-game.dto';
import { UserRequest } from '@/types/UserRequest';
import { GamesService } from './games.service';
import { TypedRequest } from '@/types/TypedRequest';
import { PatchGameDto } from './dtos/patch-game.dto';
import { GameDto } from './dtos/game.dto';
import { Types } from 'mongoose';
import { QueryRequest } from '@/types/QueryRequest';

export class GamesController extends Controller {
	static baseUrl = '/games';

	@GamesController.Post(
		'/create',
		authMiddleware,
		validationMiddleware(CreateGameDto)
	)
	async createGame(req: UserRequest<CreateGameDto>) {
		return GamesService.createGame(req.body);
	}

	@GamesController.Get('/:gameId')
	async getGame(
		req: TypedRequest<Record<string, unknown>, { gameId: Types.ObjectId }>
	) {
		const game = await GamesService.getGameById(req.params.gameId);
		return new GameDto(game);
	}

	@GamesController.Get('/')
	async getAllGames({ query }: QueryRequest<{ page: string; limit: string }>) {
		const page = query.page ? (isNaN(+query.page) ? 1 : +query.page) : 1;
		const limit = query.limit ? (isNaN(+query.limit) ? 10 : +query.limit) : 10;
		return GamesService.getAllGames(page, limit);
	}

	@GamesController.Patch(
		'/:gameId',
		authMiddleware,
		validationMiddleware(PatchGameDto)
	)
	async patchGame(req: UserRequest<PatchGameDto, { gameId: Types.ObjectId }>) {
		return GamesService.patchGame(req.user.id, req.params.gameId, req.body);
	}

	@GamesController.Delete('/:gameId', authMiddleware)
	async deleteGame(
		req: UserRequest<Record<string, unknown>, { gameId: Types.ObjectId }>
	) {
		return GamesService.deleteGame(req.user.id, req.params.gameId);
	}
}
