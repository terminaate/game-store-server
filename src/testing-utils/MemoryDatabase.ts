import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

export class MemoryDatabase {
	private mongoose: typeof mongoose;
	private mongodb: MongoMemoryServer;

	constructor() {
		void this.init();
	}

	private async init() {
		this.mongodb = await MongoMemoryServer.create();
		const uri = this.mongodb.getUri();
		this.mongoose = await mongoose.connect(uri);
	}

	async closeDatabase() {
		if (this.mongodb) {
			await mongoose.connection.dropDatabase();
			await this.mongoose.disconnect();
			await this.mongodb.stop();
		}
	}

	async dropCollections() {
		if (this.mongodb) {
			const collections = await this.mongoose.connection.db.collections();
			for (const collection of collections) {
				await this.mongoose.connection.dropCollection(
					collection.collectionName
				);
			}
		}
	}
}
