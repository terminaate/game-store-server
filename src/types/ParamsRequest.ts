import { Request } from 'express';

export type ParamsRequest<
	Params = Record<string, unknown>,
	ReqBody = Record<string, unknown>,
	QueryString = Record<string, unknown>
> = Request<Params, Record<string, unknown>, ReqBody, QueryString>;
