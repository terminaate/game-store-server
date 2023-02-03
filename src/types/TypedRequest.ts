import { Request } from 'express';

export type TypedRequest<
	ReqBody = Record<string, unknown>,
	QueryString = Record<string, unknown>
> = Request<
	Record<string, unknown>,
	Record<string, unknown>,
	ReqBody,
	QueryString
>;
