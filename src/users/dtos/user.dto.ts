import { Types } from 'mongoose';

export class UserDto {
	id: Types.ObjectId;
	username: string;
	avatar: string;

	constructor(model) {
		this.id = model.id;
		this.username = model.username;
		this.avatar = model.avatar;
	}
}
