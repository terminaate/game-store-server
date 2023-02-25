import { Types } from 'mongoose';
import { UserDocument } from '@/users/models/user.model';
import { UserRole } from '@/users/models/user-role.model';
import { Role } from '@/roles/models/role.model';

export class UserDto {
	id: Types.ObjectId;
	username: string;
	avatar: string;
	permissions: number;

	constructor(model) {
		this.id = model.id;
		this.username = model.username;
		this.avatar = model.avatar;
		this.permissions = model.permissions;
	}

	static async createDto(user: UserDocument) {
		const userRoles = await UserRole.find({
			userId: user.id,
		});
		const roles = await Promise.all(
			userRoles.map((r) => Role.findById(r.roleId))
		);
		const userPermissions = roles.reduce(
			(prev, curr) => prev + curr!.permission,
			0
		);
		return new UserDto({ ...new UserDto(user), permissions: userPermissions });
	}
}
