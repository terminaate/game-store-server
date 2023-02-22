import morgan from 'morgan';

export const loggerMiddleware = () => {
	return morgan(process.env.NODE_ENV === 'dev' ? 'dev' : 'common');
};
