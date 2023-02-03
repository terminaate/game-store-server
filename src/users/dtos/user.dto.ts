export class UserDto {
	id: string;
	username: string;

	constructor(model) {
		this.id = model.id;
		this.username = model.username;
	}
}
