import express from 'express';
import dotenv from 'dotenv';
import { apiRouter } from './routers/apiRouter';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { bodyExceptionMiddleware } from './middlewares/body-exception.middleware';
import cors from 'cors';
import { validateEnvVariables } from './utils/validateEnvVariables';

dotenv.config({ path: `.${process.env.NODE_ENV}.env` });
validateEnvVariables();
process.env;
async function bootstrap() {
	const app = express();

	const { PORT, MONGO_URI } = process.env;
	await mongoose.connect(MONGO_URI);

	app.use(
		cors({
			credentials: true,
			origin: process.env.CLIENT_URL,
		})
	);
	app.use(express.json({ limit: '10mb' }));
	app.use(cookieParser(process.env.COOKIE_SECRET));
	app.use('/api', apiRouter);
	app.use(bodyExceptionMiddleware);

	await app.listen(PORT, () =>
		console.log('Server listening on http://127.0.0.1:' + PORT)
	);
}

void bootstrap();
