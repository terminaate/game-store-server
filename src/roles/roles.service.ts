import { Role } from '@/roles/models/role.model';
import { CreateRoleDto } from '@/roles/dtos/create-role.dto';
import { RoleDto } from '@/roles/dtos/role.dto';
import { Types } from 'mongoose';
import { RolesException } from '@/roles/roles.exception';
import { UsersService } from '@/users/users.service';
import { UserRole } from '@/users/models/user-role.model';

export class RolesService {
	static async init() {
		const roles = [
			{ name: 'Admin', permission: 150 },
			{ name: 'User', permission: 50 },
		];
		for (const role of roles) {
			const candidate = await Role.findOne({ name: role.name });
			if (!candidate) {
				await Role.create(role);
			}
		}
	}

	static async createRole({ name, permission }: CreateRoleDto) {
		const candidate = await Role.findOne({ name });
		if (candidate) {
			throw RolesException.RoleAlreadyExist();
		}
		const newRole = await Role.create({ name, permission });
		return new RoleDto(newRole);
	}

	static async getRoleById(roleId: string | Types.ObjectId) {
		if (!roleId || !Types.ObjectId.isValid(roleId)) {
			throw RolesException.RoleNotExist();
		}
		const role = await Role.findById(roleId);
		if (!role) {
			throw RolesException.RoleNotExist();
		}
		return new RoleDto(role);
	}

	static async getUserRoles(userId: string | Types.ObjectId) {
		// Checking if user exist
		await UsersService.getUserById(userId);
		const userRoles = await UserRole.find({ userId });
		const roles = await Promise.all(
			userRoles.map(({ roleId }) => Role.findById(roleId))
		);
		return roles.map((role) => new RoleDto(role));
	}

	static async getUserPermissions(userId: string | Types.ObjectId) {
		await UsersService.getUserById(userId);
		const userRoles = await UserRole.find({ userId });
		const roles = await Promise.all(
			userRoles.map(({ roleId }) => Role.findById(roleId))
		);
		return roles.reduce((prev, curr) => prev + curr!.permission, 0);
	}
}
