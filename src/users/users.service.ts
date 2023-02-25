import { UsersException } from './users.exception';
import { User, UserDocument, UserEditableFields } from './models/user.model';
import { Types } from 'mongoose';
import { PatchUserDto } from './dtos/patch-user.dto';
import { isImageUrl } from '@/utils/isImageUrl';
import { UserToken } from './models/user-token.model';
import { GamesService } from '@/games/games.service';
import { UserCart, UserCartDocument } from './models/user-cart.model';
import { UserDto } from './dtos/user.dto';
import { GameDto } from '@/games/dtos/game.dto';

export class UsersService {
	static async getUserById(userId: string | Types.ObjectId) {
		if (!userId || !Types.ObjectId.isValid(userId)) {
			throw UsersException.UserIdIsNotExist();
		}
		const user = await User.findById(userId);
		if (!user) {
			throw UsersException.UserIdIsNotExist();
		}
		return user;
	}

	static async patchUser(user: UserDocument, patchUserDto: PatchUserDto) {
		const { username, avatar } = patchUserDto;
		if (username && (await User.findOne({ username }))) {
			throw UsersException.UserAlreadyExist();
		}

		if (avatar && !(await isImageUrl(avatar))) {
			throw UsersException.AvatarIsNotImage();
		}

		for (const key in patchUserDto) {
			if (UserEditableFields.includes(key) && user[key] !== patchUserDto[key]) {
				user[key] = patchUserDto[key];
			}
		}
		await user.save();
		return UserDto.createDto(user);
	}

	static async deleteUser(user: UserDocument) {
		await user.delete();
		await UserToken.deleteOne({ userId: user.id });
		return UserDto.createDto(user);
	}

	static async getUserCartItems(user: UserDocument) {
		const cartItems = await UserCart.find({ userId: user.id });
		return this.createCartDto(cartItems);
	}

	static async deleteCartItems(
		user: UserDocument,
		cartItems: Types.ObjectId[]
	) {
		const userCartItems = await UserCart.find({ userId: user.id });
		for (const cartItem of cartItems) {
			await GamesService.getGameById(cartItem);
			const item = userCartItems.findIndex((o) => o === (cartItem as any));
			if (item > 0) {
				await userCartItems[item].delete();
				userCartItems.splice(item, item);
			}
		}
		return this.createCartDto(userCartItems);
	}

	static async addCartItem(user: UserDocument, gameId: Types.ObjectId) {
		const game = await GamesService.getGameById(gameId);
		if (!(await UserCart.findOne({ userId: user.id, gameId }))) {
			await UserCart.create({ userId: user.id, gameId });
		}
		return new GameDto(game);
	}

	private static async createCartDto(cartItems: UserCartDocument[]) {
		return Promise.all(
			cartItems.map(
				async (o) =>
					new GameDto(await GamesService.getGameById(o.gameId as any))
			)
		);
	}
}
