import mongoose, { HydratedDocument, InferSchemaType } from 'mongoose';

export const UserCartSchema = new mongoose.Schema({
	gameId: {
		required: true,
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Game',
	},
	userId: {
		ref: 'User',
		required: true,
		type: mongoose.Schema.Types.ObjectId,
	},
});

export type UserCartType = InferSchemaType<typeof UserCartSchema>;

export type UserCartDocument = HydratedDocument<UserCartType>;

export const UserCart = mongoose.model<UserCartType>(
	'UserCart',
	UserCartSchema
);
