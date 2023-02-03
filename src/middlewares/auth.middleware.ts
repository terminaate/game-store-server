import { NextFunction, Request, Response } from 'express';
import { AuthService } from '../auth/auth.service';
import { exceptionMiddleware } from './exception.middleware';
import { Exception } from '../lib/exception';
import { UsersService } from '../users/users.service';
import { UserRequest } from '../types/UserRequest';

export const authMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const accessToken = req.headers.authorization?.split(' ')[1];
	if (!accessToken) {
		return exceptionMiddleware(Exception.UnauthorizedException(), req, res);
	}
	const userId = await AuthService.verifyAccessToken(accessToken);
	const candidate = await UsersService.getUserById(userId);
	(req as UserRequest).user = candidate;
	next();
};
