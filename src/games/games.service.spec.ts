import { MemoryDatabase } from '@/testing-utils/MemoryDatabase';
import { GamesService } from '@/games/games.service';
import { GamesException } from './games.exception';
import { GameDto } from '@/games/dtos/game.dto';
import { testDto } from '@/testing-utils/testDto';
import { Types } from 'mongoose';
import { RolesService } from '../roles/roles.service';
import { AuthService } from '../auth/auth.service';
import { UserDto } from '../users/dtos/user.dto';

const getGameMock = (author: Types.ObjectId) => ({
	description: 'New awesome game from Terminaate!',
	developer: 'Terminaate',
	genre: 'RPG',
	images: ['https://i.imgur.com/hepj9ZS.png'],
	price: 5000,
	name: 'Game name',
	features: ['Multiplayer'],
	platform: ['PC'],
	publisher: 'Terminaate Games Inc.',
	releaseDate: new Date().toISOString(),
	author,
});

describe('GamesService', () => {
	const memDb = new MemoryDatabase();
	let userMock: UserDto;

	beforeAll(async () => {
		await RolesService.init();
		await AuthService.init();
		userMock = (
			await AuthService.register({
				username: 'terminaate',
				password: '123456789',
			})
		).response.user;
	});
	afterAll(() => {
		memDb.closeDatabase();
	});

	// TODO
	// add test for permissions

	let gameIdMock: Types.ObjectId;

	describe('GamesService.createGame', () => {
		it('should throw error that game images includes not images url', async () => {
			const createGameDto = getGameMock(userMock.id);
			createGameDto.images.push('https://google.com');
			await expect(GamesService.createGame(createGameDto)).rejects.toEqual(
				GamesException.GameImagesInNotValid()
			);
		});

		it('should return a new game object', async () => {
			const createGameDto = getGameMock(userMock.id);
			const res = await GamesService.createGame(createGameDto);
			testDto(res, GameDto);
			gameIdMock = res.id;
		});
	});

	describe('GamesService.getGameById', () => {
		it('should return error that game id is not valid, or game is not found', async () => {
			await expect(GamesService.getGameById('' as any)).rejects.toEqual(
				GamesException.GameNotFound()
			);
			await expect(
				GamesService.getGameById('asdjahskjdhaskjhiuzxycu' as any)
			).rejects.toEqual(GamesException.GameNotFound());
			await expect(
				GamesService.getGameById('12310928310928301291902' as any)
			).rejects.toEqual(GamesException.GameNotFound());
		});

		it('should return game', async () => {
			const res = await GamesService.getGameById(gameIdMock);
			expect(!!res).toBeTruthy();
		});
	});

	describe('GamesService.getAllGames', () => {
		const gamesCount = 10;
		beforeAll(async () => {
			for (let i = 0; i < gamesCount; i++) {
				await GamesService.createGame(getGameMock(userMock.id));
			}
		});

		for (let i = 0; i < gamesCount; i++) {
			const limit = Math.floor(Math.random() * (gamesCount - 1) + 1);
			const totalPages = Math.ceil(gamesCount / limit);
			const page = Math.floor(Math.random() * (totalPages - 1) + 1);
			it(`should return ${limit} games on ${page} page`, async () => {
				const res = await GamesService.getAllGames(page, limit);
				expect(res.games.length).toBe(limit);
				for (const game of res.games) {
					testDto(game, GameDto);
				}
			});
		}
	});
});
