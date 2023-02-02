import express from 'express';
import dotenv from 'dotenv';
import { apiRouter } from './routers/apiRouter';
import { exceptionMiddleware } from './middlewares/exception.middleware';

dotenv.config({ path: `.${process.env.NODE_ENV}.env` });

async function bootstrap() {
	const app = express();

	app.use('/api', apiRouter);
	app.use(exceptionMiddleware);

	const { PORT } = process.env;
	await app.listen(PORT, () =>
		console.log('Server listening on http://127.0.0.1:' + PORT)
	);
}

void bootstrap();
