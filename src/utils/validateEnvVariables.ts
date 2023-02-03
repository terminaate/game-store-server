export const validateEnvVariables = () => {
	const requiredEnvVariables = [
		'PORT',
		'MONGO_URI',
		'JWT_ACCESS_SECRET',
		'JWT_REFRESH_SECRET',
		'COOKIE_SECRET',
		'CLIENT_URL',
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
