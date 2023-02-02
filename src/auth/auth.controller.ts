import { Controller } from '../lib/controller';
import { Request } from 'express';
import { validationMiddleware } from '../middlewares/validation.middleware';
import { RegisterDto } from './dtos/register.dto';

export class AuthController extends Controller {
	@AuthController.Post('/register', validationMiddleware(RegisterDto))
	async register(req: Request) {
		return 'asd';
	}
}
