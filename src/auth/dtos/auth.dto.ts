import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class AuthDto {
	@IsString()
	@IsNotEmpty()
	@MinLength(4)
	@MaxLength(20)
	username: string;

	@IsString()
	@IsNotEmpty()
	@MinLength(6)
	password: string;
}
