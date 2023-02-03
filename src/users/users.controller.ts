import { Controller } from '../lib/controller';
import { UserDto } from './dtos/user.dto';
import { authMiddleware } from '../middlewares/auth.middleware';
import { UserRequest } from '../types/UserRequest';
import { UsersService } from './users.service';
import { Request } from 'express';
import { validationMiddleware } from '../middlewares/validation.middleware';
import { PatchUserDto } from './dtos/patch-user.dto';

export class UsersController extends Controller {
	@UsersController.Get('/@me', authMiddleware)
	async getSelfUser({ user }: UserRequest) {
		return new UserDto(user);
	}

	@UsersController.Get('/:userId')
	async getUser(req: Request) {
		const { userId } = req.params;
		const user = await UsersService.getUserById(userId);
		return new UserDto(user);
	}

	@UsersController.Patch(
		'/@me',
		authMiddleware,
		validationMiddleware(PatchUserDto)
	)
	async patchUser(req: UserRequest<PatchUserDto>) {
		return UsersService.patchUser(req.user, req.body);
	}
}
