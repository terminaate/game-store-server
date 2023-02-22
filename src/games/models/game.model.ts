import mongoose, { HydratedDocument, InferSchemaType } from 'mongoose';

export const GameSchema = new mongoose.Schema({
	name: { type: String, required: true },
	description: { type: String, required: true },
	genre: {
		type: String,
		required: true,
	},
	developer: {
		type: String,
		required: true,
	},
	publisher: {
		type: String,
		required: true,
	},
	features: {
		type: [String],
	},
	platform: {
		type: [String],
	},
	releaseDate: { type: Date, required: true },
	price: { type: Number, required: true },
	// Here we are storage a discount PERCENT
	discount: {
		type: Number,
	},
	images: {
		type: [String],
	},
});

export type IGame = InferSchemaType<typeof GameSchema>;

export type GameDocument = HydratedDocument<IGame>;

export const Game = mongoose.model<IGame>('Game', GameSchema);
