import { Controller } from '@/lib/controller';
import { authMiddleware } from '@/middlewares/auth.middleware';
import { permissionMiddleware } from '@/middlewares/permission.middleware';
import { UserRequest } from '@/types/UserRequest';
import { CreateRoleDto } from '@/roles/dtos/create-role.dto';
import { RolesService } from '@/roles/roles.service';
import { ParamsRequest } from '@/types/ParamsRequest';
import { validationMiddleware } from '@/middlewares/validation.middleware';

export class RolesController extends Controller {
	static baseUrl = '/roles';

	@RolesController.Post(
		'/',
		authMiddleware,
		permissionMiddleware(150),
		validationMiddleware(CreateRoleDto)
	)
	async createRole(req: UserRequest<CreateRoleDto>) {
		return RolesService.createRole(req.body);
	}

	@RolesController.Get('/:roleId', authMiddleware, permissionMiddleware(100))
	async getRole(req: ParamsRequest<{ roleId: string }>) {
		return RolesService.getRoleById(req.params.roleId);
	}

	@RolesController.Get(
		'/user/:userId',
		authMiddleware,
		permissionMiddleware(100)
	)
	async getUserRoles(req: ParamsRequest<{ userId: string }>) {
		return RolesService.getUserRoles(req.params.userId);
	}
}
