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

export type UserTokenType = InferSchemaType<typeof UserTokenSchema>;

export type UserTokenDocument = HydratedDocument<UserTokenType>;

export const UserToken = mongoose.model<UserTokenType>(
	'UserToken',
	UserTokenSchema
);
