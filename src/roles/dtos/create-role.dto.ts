import { IsNumber, IsString, Min } from 'class-validator';

export class CreateRoleDto {
	@IsString()
	name: string;

	@IsNumber()
	@Min(50)
	permission: number;
}
