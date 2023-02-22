import { TypedRequest } from '@/types/TypedRequest';

export type QueryRequest<Query = Record<string, unknown>> = TypedRequest<
	Record<string, unknown>,
	Record<string, unknown>,
	Query
>;
