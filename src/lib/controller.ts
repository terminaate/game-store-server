import {
	NextFunction,
	Request,
	RequestHandler,
	Response,
	Router,
} from 'express';
import { exceptionMiddleware } from '@/middlewares/exception.middleware';
import { isObject } from '@/utils/isObject';

type RouterMethods =
	| 'all'
	| 'get'
	| 'post'
	| 'patch'
	| 'delete'
	| 'options'
	| 'put'
	| 'head';

export class Controller {
	static router = Router();

	static Get(path: string, ...handlers: RequestHandler[]) {
		return this.createDecorator('get', { path, handlers });
	}

	static Post(path: string, ...handlers: RequestHandler[]) {
		return this.createDecorator('post', { path, handlers });
	}

	static Delete(path: string, ...handlers: RequestHandler[]) {
		return this.createDecorator('delete', { path, handlers });
	}

	static Patch(path: string, ...handlers: RequestHandler[]) {
		return this.createDecorator('patch', { path, handlers });
	}

	static Put(path: string, ...handlers: RequestHandler[]) {
		return this.createDecorator('put', { path, handlers });
	}

	private static wrapper(cb: RequestHandler) {
		return async (req: Request, res: Response, next: NextFunction) => {
			try {
				const response = (await cb(req, res, next)) as
					| Record<string, unknown>
					| undefined;
				if (!response) {
					return next();
				}
				if (isObject(response)) {
					res.json(response);
				} else {
					res.send(response);
				}
			} catch (e: any) {
				exceptionMiddleware(e, req, res);
			}
		};
	}

	private static createDecorator(
		method: RouterMethods,
		params: { path: string; handlers: RequestHandler[] }
	) {
		const { router } = this;
		const { path, handlers } = params;

		return (_, propertyKey: string, descriptor: PropertyDescriptor) => {
			router[method](path, ...handlers, this.wrapper(descriptor.value));
		};
	}
}
