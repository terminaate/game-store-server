import { Router } from 'express';
import { AuthController } from '../auth/auth.controller';
import { UsersController } from '../users/users.controller';

export const apiRouter = Router();

apiRouter.use('/auth', AuthController.router);
apiRouter.use('/users', UsersController.router);
