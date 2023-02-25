export class Exception {
	constructor(public message: string | string[], public statusCode: number) {}

	static UnauthorizedException() {
		return new Exception('Unauthorized.', 401);
	}

	static ForbiddenException() {
		return new Exception('Forbidden.', 403);
	}

	static InternalServerError() {
		return new Exception('Internal Server Error', 500);
	}
}
