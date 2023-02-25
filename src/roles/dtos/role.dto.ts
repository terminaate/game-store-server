import { Types } from 'mongoose';

export class RoleDto {
	id: Types.ObjectId;
	name: string;
	permission: number;

	constructor(model) {
		this.id = model.id;
		this.name = model.name;
		this.permission = model.permission;
	}
}
