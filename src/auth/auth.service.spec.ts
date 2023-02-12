import { AuthService } from '@/auth/auth.service';
import { UserDto } from '@/users/dtos/user.dto';
import { AuthExceptions } from '@/auth/auth.exceptions';
import { MemoryDatabase } from '@/testing-utils/MemoryDatabase';

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

	describe('AuthService.register', () => {
		it('should return a new user', async () => {
			const res = await AuthService.register({
				username: 'terminaate',
				password: '12345678',
			});
			testAuthResponse(res);
		});

		it('should throw error that user with this username already exist', async () => {
			await expect(
				AuthService.register({
					username: 'terminaate',
					password: '12345678',
				})
			).rejects.toThrow(AuthExceptions);
		});
	});
});
