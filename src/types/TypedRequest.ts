import { Request } from 'express';

export type TypedRequest<
	ReqBody = Record<string, unknown>,
	Params = Record<string, unknown>,
	QueryString = Record<string, unknown>
> = Request<Params, Record<string, unknown>, ReqBody, QueryString>;
