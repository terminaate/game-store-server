import { AuthDto } from './dtos/auth.dto';
import { User, UserDocument } from '@/users/models/user.model';
import { UserDto } from '@/users/dtos/user.dto';
import { AuthException } from './auth.exception';
import jwt from 'jsonwebtoken';
import { UserToken } from '@/users/models/user-token.model';
import { Types } from 'mongoose';
import { UserRole } from '@/users/models/user-role.model';
import { Role } from '@/roles/models/role.model';

export class AuthService {
	static async init() {
		const { ADMIN_USERNAME: username, ADMIN_PASSWORD: password } = process.env;
		const candidate = await User.findOne({ username });
		if (!candidate) {
			const user = new User({ username });
			user.setPassword(password);
			await user.save();
			const adminRole = await Role.findOne({ name: 'Admin' });
			await UserRole.create({ userId: user.id, roleId: adminRole!.id });
		}
	}

	private static async createResponseDto(
		user: UserDocument,
		accessToken: string,
		refreshToken: string
	) {
		const response = {
			accessToken,
			user: await UserDto.createDto(user),
		};
		return { response, refreshToken };
	}

	static async refreshTokens(refreshToken: string) {
		const userToken = await UserToken.findOne({ refreshToken });
		if (!userToken) {
			throw AuthException.ForbiddenException();
		}
		return this.generateTokens(userToken.userId);
	}

	static async generateTokens(userId: Types.ObjectId, save = true) {
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
			throw AuthException.ForbiddenException();
		}
		await userToken.delete();
	}

	static async register({ username, password }: AuthDto) {
		const candidate = await User.findOne({ username });
		if (candidate) {
			throw AuthException.UserAlreadyExist();
		}
		const user = new User({ username });
		user.setPassword(password);
		await user.save();

		const userRole = await Role.findOne({ name: 'User' });
		await UserRole.create({ userId: user.id, roleId: userRole!.id });

		const { accessToken, refreshToken } = await this.generateTokens(user.id);
		return this.createResponseDto(user, accessToken, refreshToken);
	}

	static async login({ username, password }: AuthDto) {
		const candidate = await User.findOne({ username });
		if (!candidate || !candidate.validatePassword(password)) {
			throw AuthException.WrongAuthData();
		}
		const { accessToken, refreshToken } = await this.generateTokens(
			candidate.id
		);
		return this.createResponseDto(candidate, accessToken, refreshToken);
	}

	static verifyRefreshToken(refreshToken: string): Types.ObjectId {
		const { id } = jwt.verify(
			refreshToken,
			process.env.JWT_REFRESH_SECRET
		) as Record<string, any>;
		if (!id) {
			throw AuthException.UnauthorizedException();
		}
		return id;
	}

	static verifyAccessToken(accessToken: string): Types.ObjectId {
		const { id } = jwt.verify(
			accessToken,
			process.env.JWT_ACCESS_SECRET
		) as Record<string, any>;
		if (!id) {
			throw AuthException.UnauthorizedException();
		}
		return id;
	}
}
