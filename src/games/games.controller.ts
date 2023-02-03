import { Controller } from '../lib/controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { validationMiddleware } from '../middlewares/validation.middleware';
import { CreateGameDto } from './dtos/create-game.dto';
import { UserRequest } from '../types/UserRequest';
import { GamesService } from './games.service';
import { TypedRequest } from '../types/TypedRequest';
import { PatchGameDto } from './dtos/patch-game.dto';
import { GameDto } from './dtos/game.dto';

export class GamesController extends Controller {
	@GamesController.Post('/', authMiddleware, validationMiddleware(CreateGameDto))
	async createGame(req: UserRequest<CreateGameDto>) {
		return GamesService.createGame(req.body);
	}

	@GamesController.Get('/:gameId')
	async getGame(req: TypedRequest<Record<string, unknown>, { gameId: string }>) {
		const game = await GamesService.getGameById(req.params.gameId);
		return new GameDto(game);
	}

	@GamesController.Patch('/:gameId', authMiddleware, validationMiddleware(PatchGameDto))
	async patchGame(req: UserRequest<PatchGameDto, { gameId: string }>) {
		return GamesService.patchGame(req.params.gameId, req.body);
	}

	@GamesController.Delete('/:gameId', authMiddleware)
	async deleteGame(req: UserRequest<Record<string, unknown>, { gameId: string }>) {
		return GamesService.deleteGame(req.params.gameId);
	}
}