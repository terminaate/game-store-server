import mongoose, { HydratedDocument, InferSchemaType, Types } from 'mongoose';

export const UserRoleSchema = new mongoose.Schema({
	userId: {
		ref: 'User',
		type: Types.ObjectId,
		required: true,
	},
	roleId: {
		ref: 'Role',
		type: Types.ObjectId,
		required: true,
	},
});

export type UserRoleType = InferSchemaType<typeof UserRoleSchema>;

export type UserRoleDocument = HydratedDocument<UserRoleType>;

export const UserRole = mongoose.model<UserRoleType>(
	'UserRole',
	UserRoleSchema
);
