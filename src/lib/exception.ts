export class Exception {
	constructor(public message: string | string[], public statusCode: number) {}

	static UnauthorizedException() {
		return this.NewException('Unauthorized.', 401);
	}

	static ForbiddenException() {
		return this.NewException('Forbidden.', 403);
	}

	static InternalServerError() {
		return this.NewException('Internal Server Error', 500);
	}

	static NewException(message: string | string[], statusCode: number) {
		return new Exception(message, statusCode);
	}
}
