import { UsersExceptions } from './users.exceptions';
import { User, UserDocument } from '../models/user.model';
import { Types } from 'mongoose';
import { PatchUserDto } from './dtos/patch-user.dto';
import { UserDto } from './dtos/user.dto';

export class UsersService {
	static async getUserById(userId: string) {
		if (!userId || !Types.ObjectId.isValid(userId)) {
			throw UsersExceptions.UserIdIsNotExist();
		}
		const user = await User.findById(userId);
		if (!user) {
			throw UsersExceptions.UserIdIsNotExist();
		}
		return user;
	}

	static async patchUser(user: UserDocument, patchUserDto: PatchUserDto) {
		if (
			patchUserDto.username &&
			(await User.findOne({ username: patchUserDto.username }))
		) {
			throw UsersExceptions.UserAlreadyExist();
		}

		for (const key in patchUserDto) {
			if (user.get(key) && user.get(key) !== patchUserDto[key]) {
				user.set(key, patchUserDto[key]);
			}
		}
		await user.save();
		return new UserDto(user);
	}
}
