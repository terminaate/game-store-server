export class UserDto {
	id: string;
	username: string;
	avatar: string;

	constructor(model) {
		this.id = model.id;
		this.username = model.username;
		this.avatar = model.avatar;
	}
}
