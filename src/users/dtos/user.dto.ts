export class UserDto {
	id: string;
	username: string;
	avatar: string;
	cart: string[];

	constructor(model) {
		this.id = model.id;
		this.username = model.username;
		this.avatar = model.avatar;
		this.cart = model.cart;
	}
}
