import { Request, Response } from 'express';
import { Exception } from '../lib/exception';

export const exceptionMiddleware = (
	err: Error,
	req: Request,
	res: Response
): Response => {
	if (err instanceof Exception) {
		const { message, statusCode } = err;
		res.status(statusCode);
		return res.json({ message, statusCode });
	}
	return exceptionMiddleware(Exception.InternalServerError(), req, res);
};
