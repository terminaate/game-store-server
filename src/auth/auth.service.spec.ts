import { AuthService } from '@/auth/auth.service';
import { UserDto } from '@/users/dtos/user.dto';
import { MemoryDatabase } from '@/testing-utils/MemoryDatabase';
import { AuthExceptions } from '@/auth/auth.exceptions';
import { UserToken } from '@/users/models/user-token.model';

type AuthResponse = {
	refreshToken: string;
	response: {
		accessToken: string;
		user: UserDto;
	};
};

const testAuthResponse = (res: AuthResponse) => {
	expect(Object.keys(res)).toEqual(['response', 'refreshToken']);
	expect(typeof res.refreshToken).toBe('string');
	expect(Object.keys(res.response)).toEqual(['accessToken', 'user']);
	expect(Object.keys(res.response.user)).toEqual(['id', 'username', 'avatar']);
};

describe('AuthService', () => {
	let memDb: MemoryDatabase;

	beforeAll(async () => {
		memDb = new MemoryDatabase();
	});
	afterAll(() => {
		memDb.closeDatabase();
	});

	let refreshMock: string;

	describe('AuthService.register', () => {
		it('should return a new user', async () => {
			const res = await AuthService.register({
				username: 'terminaate',
				password: '12345678',
			});
			testAuthResponse(res);
			refreshMock = res.refreshToken;
		});

		it('should throw error that user with this username already exist', async () => {
			await expect(
				AuthService.register({
					username: 'terminaate',
					password: '12345678',
				})
			).rejects.toEqual(AuthExceptions.UserAlreadyExist());
		});
	});

	describe('AuthService.login', () => {
		it('should return an authorized user', async () => {
			const res = await AuthService.login({
				username: 'terminaate',
				password: '12345678',
			});
			testAuthResponse(res);
		});

		it('should throw error that user with this username is not exist', async () => {
			await expect(
				AuthService.login({
					username: 'termi',
					password: '12345678',
				})
			).rejects.toEqual(AuthExceptions.WrongAuthData());
		});

		it('should throw error that user password is not right', async () => {
			await expect(
				AuthService.login({
					username: 'terminaate',
					password: '123456789',
				})
			).rejects.toEqual(AuthExceptions.WrongAuthData());
		});
	});

	describe('AuthService.refreshTokens', () => {
		it('should throw error that refreshToken is not exist in db', async () => {
			await expect(
				AuthService.refreshTokens('someAbsurdValue')
			).rejects.toEqual(AuthExceptions.ForbiddenException());
		});

		it('should return a new tokens (accessToken, refreshToken)', async () => {
			const res = await AuthService.refreshTokens(refreshMock);
			expect(Object.keys(res)).toEqual(['refreshToken', 'accessToken']);
			expect(Object.values(res).map((o) => typeof o)).toEqual([
				'string',
				'string',
			]);
			await AuthService.verifyAccessToken(res.accessToken);
			await AuthService.verifyRefreshToken(res.refreshToken);
			refreshMock = res.refreshToken;
		});
	});

	describe('AuthService.deleteToken', () => {
		it('should throw error that token is not exist', async () => {
			await expect(AuthService.deleteToken('someAbsurdValue')).rejects.toEqual(
				AuthExceptions.ForbiddenException()
			);
		});

		it('should delete a token from database', async () => {
			await AuthService.deleteToken(refreshMock);
			expect(
				Boolean(await UserToken.findOne({ refreshToken: refreshMock }))
			).toBeFalsy();
		});
	});
});
