import { UserDocument } from '../models/user.model';
import { TypedRequest } from './TypedRequest';

export type UserRequest<
	B = Record<string, unknown>,
	P = Record<string, unknown>
> = TypedRequest<B, P> & { user: UserDocument };
