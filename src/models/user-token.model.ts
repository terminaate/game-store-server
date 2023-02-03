import mongoose, { HydratedDocument, InferSchemaType } from 'mongoose';

export const UserTokenSchema = new mongoose.Schema({
	refreshToken: {
		required: true,
		type: String,
	},
	userId: {
		ref: 'User',
		required: true,
		type: mongoose.Schema.Types.ObjectId,
	},
});

export type IUserToken = InferSchemaType<typeof UserTokenSchema>;

export type UserTokenDocument = HydratedDocument<IUserToken>;

export const UserToken = mongoose.model<IUserToken>(
	'UserToken',
	UserTokenSchema
);
