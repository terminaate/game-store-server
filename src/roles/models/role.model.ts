import mongoose, { HydratedDocument, InferSchemaType } from 'mongoose';

export const RoleSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	permission: {
		type: Number,
		required: true,
	},
});

export type RoleType = InferSchemaType<typeof RoleSchema>;

export type RoleDocument = HydratedDocument<RoleType>;

export const Role = mongoose.model<RoleType>('Role', RoleSchema);
