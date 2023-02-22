import express from 'express';
import dotenv from 'dotenv';
import { apiRouter } from './routers/apiRouter';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { bodyExceptionMiddleware } from './middlewares/body-exception.middleware';
import cors from 'cors';
import { validateEnvVariables } from './utils/validateEnvVariables';
import { loggerMiddleware } from '@/middlewares/logger.middleware';
import { ResponseDto } from '@/dtos/response.dto';

dotenv.config({ path: `.${process.env.NODE_ENV}.env` });
validateEnvVariables();

async function bootstrap() {
	const app = express();

	const { PORT, MONGO_URI, CLIENT_URL, COOKIE_SECRET } = process.env;
	await mongoose.connect(MONGO_URI);

	app.disable('x-powered-by');
	app.use(
		cors({
			credentials: true,
			origin: CLIENT_URL,
		})
	);
	app.use(express.json({ limit: '10mb' }));
	app.use(cookieParser(COOKIE_SECRET));
	app.use('/api', apiRouter);
	app.use(bodyExceptionMiddleware);
	app.use(loggerMiddleware());
	app.use('*', (req, res) => {
		res.status(404);
		res.json(new ResponseDto('Not found', 404));
	});

	app.listen(PORT, () =>
		console.log('Server listening on http://127.0.0.1:' + PORT)
	);
}

void bootstrap();
