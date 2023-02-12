import { AuthDto } from './dtos/auth.dto';
import { User, UserDocument } from '@/users/models/user.model';
import { UserDto } from '@/users/dtos/user.dto';
import { AuthExceptions } from './auth.exceptions';
import jwt from 'jsonwebtoken';
import { UserToken } from '@/users/models/user-token.model';

export class AuthService {
	private static createResponseDto(
		user: UserDocument,
		accessToken: string,
		refreshToken: string
	) {
		const response = {
			accessToken,
			user: new UserDto(user),
		};
		return { response, refreshToken };
	}

	static async refreshTokens(refreshToken: string) {
		const userToken = await UserToken.findOne({ refreshToken });
		if (!userToken) {
			throw AuthExceptions.ForbiddenException();
		}
		return this.generateTokens(userToken.get('userId'));
	}

	static async generateTokens(userId: string, save = true) {
		// TODO
		// add sessions system
		const accessToken = jwt.sign(
			{ id: userId },
			process.env.JWT_ACCESS_SECRET!,
			{
				expiresIn: '1d',
			}
		);
		const refreshToken = jwt.sign(
			{ id: userId },
			process.env.JWT_REFRESH_SECRET!,
			{ expiresIn: '7d' }
		);
		if (!save) {
			return { refreshToken, accessToken };
		}
		const candidate = await UserToken.findOne({ userId });
		if (!candidate) {
			await UserToken.create({ userId, refreshToken });
		} else {
			candidate.refreshToken = refreshToken;
			await candidate.save();
		}
		return { refreshToken, accessToken };
	}

	static async deleteToken(refreshToken: string) {
		const userToken = await UserToken.findOne({ refreshToken });
		if (!userToken) {
			throw AuthExceptions.ForbiddenException();
		}
		await userToken.delete();
	}

	static async register({ username, password }: AuthDto) {
		const candidate = await User.findOne({ username });
		if (candidate) {
			throw AuthExceptions.UserAlreadyExist();
		}
		const user = new User({ username });
		user.setPassword(password);
		await user.save();
		const { accessToken, refreshToken } = await this.generateTokens(user.id);
		return this.createResponseDto(user, accessToken, refreshToken);
	}

	static async login({ username, password }: AuthDto) {
		const candidate = await User.findOne({ username });
		if (!candidate || !candidate.validatePassword(password)) {
			throw AuthExceptions.WrongAuthData();
		}
		const { accessToken, refreshToken } = await this.generateTokens(
			candidate.id
		);
		return this.createResponseDto(candidate, accessToken, refreshToken);
	}

	static verifyAccessToken(accessToken: string): string {
		const { id } = jwt.verify(
			accessToken,
			process.env.JWT_ACCESS_SECRET!
		) as Record<string, any>;
		if (!id) {
			throw AuthExceptions.UnauthorizedException();
		}
		return id;
		// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZThlYTEwZmY2MDlmZDhmZGJlYTg0YiIsImlhdCI6MTY3NjIwODY1NiwiZXhwIjoxNjc2Mjk1MDU2fQ.gpWEVWhwmpvTjFRY9CJLba9O694sr89T40MOjqgvFrg
	}
}
