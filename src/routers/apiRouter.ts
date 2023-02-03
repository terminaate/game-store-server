import { Router } from 'express';
import { AuthController } from '../auth/auth.controller';
import { UsersController } from '../users/users.controller';
import { GamesController } from '../games/games.controller';

export const apiRouter = Router();

apiRouter.use('/auth', AuthController.router);
apiRouter.use('/users', UsersController.router);
apiRouter.use('/games', GamesController.router);
