import { Request } from 'express';

export type RequestBody<T = any> = Request & { body: T };
