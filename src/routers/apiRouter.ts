import { Router } from 'express';
import { AuthController } from '@/auth/auth.controller';
import { UsersController } from '@/users/users.controller';
import { GamesController } from '@/games/games.controller';
import { RolesController } from '@/roles/roles.controller';

export const apiRouter = Router();

apiRouter.use('/auth', AuthController.router);
apiRouter.use('/games', GamesController.router);
apiRouter.use('/roles', RolesController.router);
apiRouter.use('/users', UsersController.router);
