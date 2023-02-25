import { NextFunction, Request, Response } from 'express';
import { Exception } from '@/lib/exception';
import { exceptionMiddleware } from '@/middlewares/exception.middleware';
import { UserRequest } from '@/types/UserRequest';
import { RolesService } from '@/roles/roles.service';

export const permissionMiddleware = (requiredPermission: number) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		const { user = null } = req as UserRequest;
		if (!user) {
			return exceptionMiddleware(
				Exception.UnauthorizedException(),
				req as Request,
				res
			);
		}
		const userPermissions = await RolesService.getUserPermissions(user.id);
		if (userPermissions >= requiredPermission) {
			return next();
		} else {
			return exceptionMiddleware(
				Exception.ForbiddenException(),
				req as Request,
				res
			);
		}
	};
};
