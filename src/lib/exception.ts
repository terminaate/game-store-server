export class Exception extends Error {
	constructor(public message: string, public statusCode: number) {
		super(message);
	}

	static UnauthorizedException() {
		return this.NewException('Unauthorized.', 401);
	}

	static ForbiddenException() {
		return this.NewException('Forbidden.', 403);
	}

	static InternalServerError() {
		return this.NewException('Internal Server Error', 500);
	}

	static NewException(message: string, statusCode: number) {
		return new Exception(message, statusCode);
	}
}
