import { Controller } from '@/lib/controller';
import { authMiddleware } from '@/middlewares/auth.middleware';
import { UserRequest } from '@/types/UserRequest';
import { UsersService } from './users.service';
import { validationMiddleware } from '@/middlewares/validation.middleware';
import { PatchUserDto } from './dtos/patch-user.dto';
import { TypedRequest } from '@/types/TypedRequest';
import { Response } from 'express';
import { CartItemDto } from './dtos/cart-item.dto';
import { UserDto } from './dtos/user.dto';
import { Types } from 'mongoose';

export class UsersController extends Controller {
	@UsersController.Get('/@me', authMiddleware)
	async getSelfUser(req: UserRequest) {
		return UserDto.createDto(req.user);
	}

	@UsersController.Get('/:userId')
	async getUser(
		req: TypedRequest<Record<string, unknown>, { userId: Types.ObjectId }>
	) {
		const user = await UsersService.getUserById(req.params.userId);
		return UserDto.createDto(user);
	}

	@UsersController.Patch(
		'/@me',
		authMiddleware,
		validationMiddleware(PatchUserDto)
	)
	async patchUser(req: UserRequest<PatchUserDto>) {
		return UsersService.patchUser(req.user, req.body);
	}

	@UsersController.Delete('/@me', authMiddleware)
	async deleteUser(req: UserRequest, res: Response) {
		res.clearCookie('refreshToken');
		return UsersService.deleteUser(req.user);
	}

	@UsersController.Get('/@me/cart', authMiddleware)
	async getUserCart(req: UserRequest) {
		return UsersService.getUserCartItems(req.user);
	}

	@UsersController.Put(
		'/@me/cart',
		authMiddleware,
		validationMiddleware(CartItemDto)
	)
	async addCartItem(req: UserRequest<CartItemDto>) {
		return UsersService.addCartItem(req.user, req.body.gameId);
	}

	@UsersController.Delete('/@me/cart', authMiddleware)
	async deleteCartItems(req: UserRequest<Types.ObjectId[]>) {
		return UsersService.deleteCartItems(req.user, req.body);
	}
}
