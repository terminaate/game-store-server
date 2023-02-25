export const validateEnvVariables = () => {
	const requiredEnvVariables = [
		'PORT',
		'MONGO_URI',
		'JWT_ACCESS_SECRET',
		'JWT_REFRESH_SECRET',
		'COOKIE_SECRET',
		'CLIENT_URL',
		'NODE_ENV',
		'ADMIN_USERNAME',
		'ADMIN_PASSWORD',
	];
	const notFoundedEnvVariables: string[] = [];
	for (const env of requiredEnvVariables) {
		if (!process.env[env]) {
			notFoundedEnvVariables.push(env);
		}
	}
	if (notFoundedEnvVariables.length) {
		throw new Error(
			'Missing required env variable - ' + notFoundedEnvVariables
		);
	}
};
