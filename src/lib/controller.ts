import {
	NextFunction,
	Request,
	RequestHandler,
	Response,
	Router,
} from 'express';
import { isObject } from '@/utils/isObject';
import { exceptionMiddleware } from '@/middlewares/exception.middleware';

type RouterMethods =
	| 'all'
	| 'get'
	| 'post'
	| 'patch'
	| 'delete'
	| 'options'
	| 'put'
	| 'head';

export abstract class Controller {
	static router = Router();
	static baseUrl? = '/';

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
				const response = (await cb(req, res, next)) as Record<
					string,
					unknown
				> | void;
				if (!response) {
					return next();
				}
				if (isObject(response)) {
					res.json(response);
				} else {
					res.send(response);
				}
			} catch (e) {
				return exceptionMiddleware(e as Error, req, res);
			}
		};
	}

	// TODO
	// add logging a handled routes
	private static createDecorator(
		method: RouterMethods,
		params: { path: string; handlers: RequestHandler[] }
	) {
		const { router } = this;
		const { path, handlers } = params;

		return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
			router[method](
				this.baseUrl + path,
				...handlers,
				this.wrapper(descriptor.value)
			);
		};
	}
}
