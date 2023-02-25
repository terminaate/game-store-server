import { Controller } from '@/lib/controller';
import { authMiddleware } from '@/middlewares/auth.middleware';
import { permissionMiddleware } from '@/middlewares/permission.middleware';
import { UserRequest } from '@/types/UserRequest';
import { CreateRoleDto } from '@/roles/dtos/create-role.dto';
import { RolesService } from '@/roles/roles.service';
import { ParamsRequest } from '@/types/ParamsRequest';

export class RolesController extends Controller {
	@RolesController.Post('/create', authMiddleware, permissionMiddleware(150))
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
