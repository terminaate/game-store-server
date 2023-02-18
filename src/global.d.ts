type Class<T = any> = { new (): T };

namespace NodeJS {
	interface ProcessEnv {
		PORT: string;
		MONGO_URI: string;
		JWT_ACCESS_SECRET: string;
		JWT_REFRESH_SECRET: string;
		COOKIE_SECRET: string;
		CLIENT_URL: string;
	}
}
