import express from 'express';
import dotenv from 'dotenv';
import { apiRouter } from './routers/apiRouter';
import mongoose from 'mongoose';

dotenv.config({ path: `.${process.env.NODE_ENV}.env` });

async function bootstrap() {
	const app = express();

	const { PORT, MONGO_URI } = process.env;
	await mongoose.connect(MONGO_URI!);

	app.use(express.json({ limit: '10mb' }));
	app.use('/api', apiRouter);

	await app.listen(PORT, () =>
		console.log('Server listening on http://127.0.0.1:' + PORT)
	);
}

void bootstrap();
