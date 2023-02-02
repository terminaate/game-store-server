import { Controller } from '../lib/controller';

export class AuthController extends Controller {
	@AuthController.Get('/')
	async as() {
		throw Error('asd');
	}
}
