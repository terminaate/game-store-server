import { Router } from 'express';
import { AuthController } from '../auth/auth.controller';

export const apiRouter = Router();

apiRouter.use('/auth', AuthController.router);
