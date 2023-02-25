import { Router } from 'express';
import { AuthController } from '@/auth/auth.controller';
import { UsersController } from '@/users/users.controller';
import { GamesController } from '@/games/games.controller';
import { RolesController } from '@/roles/roles.controller';

export const apiRouter = Router();

apiRouter.use(AuthController.router);
apiRouter.use(GamesController.router);
apiRouter.use(RolesController.router);
apiRouter.use(UsersController.router);
