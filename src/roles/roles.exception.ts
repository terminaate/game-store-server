import { Exception } from '@/lib/exception';

export class RolesException extends Exception {
	static RoleAlreadyExist() {
		return new RolesException('Role with this name already exist', 400);
	}

	static RoleNotExist() {
		return new RolesException("Role with this id isn't exist", 400);
	}
}
