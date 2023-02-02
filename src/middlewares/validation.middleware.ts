import { NextFunction, Request, Response } from 'express';
import { transformAndValidate } from 'class-transformer-validator';
import { ValidationError } from 'class-validator';
import { exceptionMiddleware } from './exception.middleware';
import { Exception } from '../lib/exception';

export const validationMiddleware = (dto: Class) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			req.body = await transformAndValidate(dto, req.body);
			next();
		} catch (errors: any) {
			const messages = errors.reduce(
				(c: any[], p: ValidationError) => [
					...c,
					...Object.values(p.constraints!),
				],
				[]
			);
			console.log(messages);
			return exceptionMiddleware(
				Exception.NewException(messages, 400),
				req,
				res
			);
		}
	};
};
