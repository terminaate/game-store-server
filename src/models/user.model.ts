import mongoose from 'mongoose';

export interface IUser {
	username: string;
	password: string;
}

export const UserSchema = new mongoose.Schema({
	username: {
		required: true,
		type: String,
	},
	password: {
		required: true,
		type: String,
	},
});

export const User = mongoose.model<IUser>('User', UserSchema);
